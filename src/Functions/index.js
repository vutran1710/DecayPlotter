export const decay = (origin, time, half_time) => {
  // Decay const lambda = 0.693 / T{1/2}
  // when given T{1/2} = 2 days -> lambda = 0.347
  // N = N0 * e^(−λt)
  let decay_constant = 0.693 / half_time
  let powerlevel = -decay_constant * time
  let rem = origin * Math.pow(Math.E, powerlevel)
  return rem;
}

export const score_calc = (origin, r, t, half_time) => {
  return origin + decay(r, t, half_time / 2)
}

export const S1T = (S0, t, steepness) => S0 * Math.pow(1/steepness, t)

export const S2T = (upperBound, x, inflectionPoint, steepness) => {
  // https://towardsdatascience.com/transforming-skewed-data-73da4c2d0d16
  if (x <= 0) return 0
  const base = 1 + Math.pow(steepness, inflectionPoint - x)
  return upperBound / base
}

export const adjust_effective_R = (R, blockCount) => {
  // Accumulative R minus the required Rt
  const required_factor = 2
  return R - required_factor * blockCount
}

export const formula = (S0, t, R, steepness, Smax, blockLength) => {
  const N = S1T(S0, t, steepness)

  const blockCount = t / blockLength
  const inflectionPoint = 10 / blockCount
  const upperBound = Smax - N
  const effectiveR = adjust_effective_R(R, blockCount)

  const P = S2T(upperBound, effectiveR, inflectionPoint, steepness)
  return N + P
}
