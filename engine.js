/* SaunaMath engine - pure functions, no DOM. Honest home sauna math.
   Constants stated in the UI: 1 kW of heater per 50 cu ft of room, plus 50%
   more volume counted for glass or uninsulated surfaces, 24 in of upper bench
   per person, about 7 lb of stones per kW, heat-up roughly 30-45 minutes. */
var SaunaMath = (function () {
  function volumeCuFt(lenFt, widFt, hgtFt) {
    return lenFt * widFt * hgtFt;
  }
  function effectiveVolume(volCuFt, glassSqFt, coldWallSqFt) {
    return volCuFt + (glassSqFt + coldWallSqFt) * 1.5;
  }
  function heaterKw(effVolCuFt) {
    return effVolCuFt / 50;
  }
  function kwVerdict(kw) {
    if (kw <= 4.5) return 'A 4.5 kW heater covers it - the small-plug sweet spot, cheap to run.';
    if (kw <= 6) return 'A 6 kW heater - the classic home sauna size, wants a 240V circuit.';
    if (kw <= 8) return 'An 8 kW unit - big room or lots of glass; the electrician visit is mandatory.';
    return 'Over 8 kW - this is a commercial-scale room; the math says split it or rethink the glass wall.';
  }
  function benchPeople(benchLenIn) {
    return Math.floor(benchLenIn / 24);
  }
  function benchVerdict(people, heaterKw) {
    if (people <= 0) return 'No usable bench - under two feet of upper bench is a shelf, not a seat.';
    if (people === 1) return 'Solo sauna - perfectly respectable, and the easiest build of all.';
    if (people * 60 > heaterKw * 50) return 'More bench than heater - ' + people + ' people will crowd the stones; size the heater for the crowd or stagger sessions.';
    return 'Bench and heater match - ' + people + ' on the top bench with room to throw water.';
  }
  function stonesLb(kw) {
    return kw * 7;
  }
  function heatupMin(effVolCuFt, kw) {
    var ratio = effVolCuFt / (kw * 50);
    return 25 + (ratio - 1) * 30;
  }
  function heatupVerdict(mins) {
    if (mins <= 30) return 'Under 30 minutes to temperature - spontaneous weeknight sauna, the goal.';
    if (mins <= 45) return '30-45 minutes - normal; text the household when you flip the switch.';
    return 'Over 45 minutes - underpowered or leaky; check door seals and the heater size before blaming the stones.';
  }
  function sessionCost(kw, hours, kwhPrice) {
    return kw * 0.7 * hours * kwhPrice;
  }
  function costVerdict(perSession) {
    if (perSession <= 1.5) return 'Under $1.50 a session - cheaper than the gas to drive to the spa.';
    if (perSession <= 4) return 'A couple of dollars a session - the home sauna economics win easily.';
    return 'Pricey sessions - the heater is cycling hard; insulate before counting the pennies.';
  }
  return {
    volumeCuFt: volumeCuFt, effectiveVolume: effectiveVolume, heaterKw: heaterKw, kwVerdict: kwVerdict,
    benchPeople: benchPeople, benchVerdict: benchVerdict, stonesLb: stonesLb, heatupMin: heatupMin,
    heatupVerdict: heatupVerdict, sessionCost: sessionCost, costVerdict: costVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = SaunaMath;
