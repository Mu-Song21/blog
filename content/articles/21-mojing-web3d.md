---
id: 21
title: "墨境的双 WebGL 栈：scene.ts 内核、行走画质与灵兽隔离"
excerpt: "约 3200 行的 scene.ts 同时管相机、EffectComposer、展区切换与行走 FPS 自适应；灵兽区用独立 three-jl canvas。记录为何双栈、行走为何必须关 inkPost，以及画质双轨怎么设计。"
category: "数字文化"
tags: ["墨境","Three.js","three-jl","WebGL","Web3D","后处理","性能"]
createdAt: 2026-07-12
updatedAt: 2026-07-18
featured: false
status: published
---

## 为什么 `scene.ts` 这么重

墨境主馆的三维逻辑没有拆成「每个展区一个玩具 Demo」，而是收敛进 `frontend/src/scene.ts`（约 **3185 行**）。它同时负责：

- 场景、相机、灯光与展品安装  
- `EffectComposer` 后处理栈（景深、Bloom、水墨纸感等）  
- 展区主题切换、沉浸世界与行走模式分叉  
- 行走期 FPS 监测与画质降档  

UI 层（`HeroSection`、ArcDock）只驱动状态；真正的运行时内核在这里。好处是交互状态集中；代价是文件巨大，后续维护要靠清晰的函数边界（`applyAreaTheme`、`enterWalkMode`、`applyWalkPerformanceProfile`）。

## 后处理栈怎么搭

初始化时按当前画质档装配 Composer，并尊重系统的「减少动态效果」偏好：

```typescript
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bokehPass = new BokehPass(scene, camera, {
  focus: 8, aperture: 0.00012, maxblur: 0.004
});
bokehPass.enabled = initialQuality.bokehInGallery;

composer.addPass(new UnrealBloomPass(/* ... */));
const inkPost = createInkPostStack(width, height);
composer.addPass(inkPost.paperPass);
composer.addPass(inkPost.watercolorPass);
composer.addPass(inkPost.vignettePass);

let inkPostEnabled = initialQuality.inkPostEnabled
  && !matchMedia('(prefers-reduced-motion: reduce)').matches;
```

展厅静态观展时可以叠水墨后处理；一旦进入行走，策略会立刻改变——见下一节。

## 展区切换与双栈隔离

| 渲染栈 | 展区 | 职责 |
|--------|------|------|
| Three.js（`scene.ts`） | 山水 / 书法 | 漫游、沉浸、后处理、展品交互 |
| three-jl（独立 canvas） | 灵兽 | 粒子 morph 分段叙事，独立 WebGL 上下文 |

```typescript
function applyAreaTheme(areaId?: number | null) {
  if (immersiveMode || immersiveTransition) {
    const nextId = areaId || 1;
    if (nextId !== currentAreaId) exitImmersiveWorld();
  }
  currentAreaId = areaId || 1;
  if (currentAreaId === CREATURE_AREA_ID) creatureJl.preload();
  // 换 mural、厅堂配色、默认相机位，再同步展品安装
}
```

若把粒子灵兽硬塞进主馆同一场景，资源加载、后处理与相机控制会互相踩。独立 canvas 的代价是包体与两套交互规范；收益是故障隔离——主馆 bug 不必拖垮灵兽页，反之亦然。

可演示展区收口为三区；非遗、器物相关内容已下线。少而稳，比六区空壳更适合答辩。

## 行走模式：性能不是事后补丁

进入行走前，山水区往往会先切入沉浸世界，再落到第一人称控制。行走期有独立的性能档位（0/1/2），并由 FPS 监测自动降档；加载后约 8 秒内避免误判到最低档，防止贴图尚未就绪就被当成「卡顿」。

关键约束写在代码注释里，也很值得写进博客：

```typescript
function applyWalkPerformanceProfile(tier: WalkPerfTier = WALK_DEFAULT_TIER) {
  bokehPass.enabled = false;
  // 行走必须保持双层；全屏 inkPost 会白屏，故此处始终关闭
  inkPost.setEnabled(false);
  renderer.setPixelRatio(Math.min(
    devicePixelRatio,
    Math.min(preset.pixelRatioMax, qualityWalkCap)
  ));
  bloomPass.strength = WALK_BLOOM_BY_TIER[tier];
  dualLayer.setEnabled(/* 沉浸或行走时开启 */);
}
```

**行走 + 全屏 inkPost = 白屏**，这是真实踩坑后的硬规则，不是「为了优化随便关特效」。

用户侧还有另一套档位（流畅 / 标准 / 高清），控制纹理上限与 Bloom 强度，并持久化到 `localStorage`。两套体系分工不同：用户档决定「我想要多好看」；行走档决定「现在还能不能 30+ FPS」。

## 其它工程细节

- Hero 离屏且非沉浸时暂停渲染，减少后台页吃 GPU  
- 千里江山贴图在 AppShell 启动阶段预拉；灵兽在切区时 `preload`  
- 外链 Wikimedia 缩略图曾因 CORS 破坏 WebGL 纹理——种子数据强制本地 `/assets/exhibit/*.jpg`  

灵兽 JL 侧文档还记过「不要恢复 jlScene.background」「不要对凤凰 Points 每帧 updateMorphTargets」一类铁律；那是另一条粒子管线的坑，和主馆后处理是两套问题。

## 小结

双栈不是为了简历多写一个名词，而是承认：**主馆后处理世界**和**粒子叙事世界**的资源模型不同。`scene.ts` 负责把前者做成可切换、可行走、可降质的内核；`three-jl` 负责把后者隔离开。产品闭环与工坊见 [墨境工程实践](/blog/20)。
