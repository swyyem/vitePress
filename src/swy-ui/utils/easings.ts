/**
 * 三次缓动函数（ease-in-out）
 * @param t - 当前时间（通常从0开始）
 * @param b - 起始值
 * @param c - 变化量（结束值 - 起始值）
 * @param d - 总持续时间
 * @returns 当前时间对应的值
 */
export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  // 1. 计算实际变化量
  const cc = c - b
  // 2. 标准化时间到 [0, 2] 范围
  t /= d / 2
  if (t < 1) {
    // 前半段：缓入加速
    return (cc / 2) * t * t * t + b
  }
  // 后半段：缓出减速
  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}
