function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

/**
 * @param {HTMLElement} el 
 * @param {number} rank 
 */
function updateResult(el, rank) {
  el.style.setProperty("--rank", rank)
  el.querySelector(".rank").innerHTML = `Rank ${romanize(rank)}`
  el.querySelector(".rarity").innerHTML = `1/${(2**(rank-1)).toString()}`
}

let best = 1
function roll() {
  let rank = 1
  while (Math.random() > 0.5) {
    rank += 1
  }
  
  if (best < rank) {
    best = rank
    updateResult(document.querySelector(".result.main"), rank)
  }

  let miniresults = document.getElementById("miniresults")
  let el = document.querySelector(".result.main").cloneNode(true)
  updateResult(el, rank)
  miniresults.appendChild(el)

  if (miniresults.children.length > 50) {
    miniresults.children[0].remove()
  }
}