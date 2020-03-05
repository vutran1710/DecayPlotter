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
