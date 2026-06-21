// 设置最大递归深度，防止浏览器卡死
const MAX_DEPTH = 8; 

function setup() {
  createCanvas(800, 600);
  // 使用度数制，更直观
  angleMode(DEGREES); 
}

function draw() {
  background(240, 245, 255); // 浅蓝色背景
  
  // 将坐标系原点移到画布底部中央，作为树根
  translate(width / 2, height);
  
  // 计算动态旋转角度
  // millis() * 0.1 控制速度，sin() 输出 -1 到 1，最后映射到 15 到 35 度之间
  let targetAngle = map(sin(millis() * 0.1), -1, 1, 15, 35);
  
  // 开始绘制递归树
  // 参数：树干初始长度=150, 初始粗细=12, 当前深度=0, 动态角度
  drawBranch(150, 12, 0, targetAngle);
}

function drawBranch(len, thickness, depth, angle) {
  // 1. 设置当前层级的粗细和颜色
  strokeWeight(thickness);
  
  // 颜色过渡：从棕色 (110, 70, 45) 过渡到绿色 (34, 139, 34)
  let inter = map(depth, 0, MAX_DEPTH, 0, 1);
  let c = lerpColor(color(110, 70, 45), color(34, 139, 34), inter);
  stroke(c);
  
  // 2. 绘制当前树枝
  line(0, 0, 0, -len);
  
  // 3. 移动坐标系到当前树枝的末端
  translate(0, -len);
  
  // 4. 递归终止条件：达到最大深度，或者树枝太短
  if (depth < MAX_DEPTH && len > 5) {
    
    // --- 绘制右侧树枝 ---
    push(); // 保存当前状态
    rotate(angle); // 顺时针旋转
    // 递归调用：长度变为原来的 0.75 倍，粗细变为 0.7 倍，深度 + 1
    drawBranch(len * 0.75, thickness * 0.7, depth + 1, angle);
    pop(); // 恢复状态
    
    // --- 绘制左侧树枝 ---
    push(); // 保存当前状态
    rotate(-angle); // 逆时针旋转
    drawBranch(len * 0.75, thickness * 0.7, depth + 1, angle);
    pop(); // 恢复状态
    
  }
}