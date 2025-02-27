class Hexagon {
  constructor(grid, col, row, radius, content = null) {
    this.grid = grid;
    this.col = col;
    this.row = row;
    this._radius = radius;

    this.hexWidth = Math.sqrt(3) * this._radius;
    this.hexHeight = 2 * this._radius;

    this.x = col * 1.5 * (this._radius + 1) + this._radius;
    this.y = row * (this.hexHeight * 0.866) + (col % 2) * (this.hexHeight / 2 * 0.866) + this._radius;

    this.content = (content === null) ? `${this.col},${this.row}` : content;
  }

  get radius() { return this._radius; }

  // Méthode principale
  render() {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute('class', 'hex-group');

    // 1) On calcule les 6 sommets de l’hexagone
    const corners = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i; // 60° * i
      const px = this.x + this._radius * Math.cos(angle);
      const py = this.y + this._radius * Math.sin(angle);
      corners.push({ x: px, y: py });
    }

    // 2) On crée le <polygon> de l’hexagone principal
    const hexagon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const hexPoints = corners.map(c => `${c.x},${c.y}`).join(' ');
    hexagon.setAttribute('points', hexPoints);
    hexagon.classList.add('hex');
    group.appendChild(hexagon);

    // 1) Calcul de la ligne décalée pour chaque côté
    const d = 0.2 * this._radius; // distance entre l'hexagone et la bordure
    const offsetEdges = [];

    for (let i = 0; i < 6; i++) {
      const c1 = corners[i];
      const c2 = corners[(i + 1) % 6];

      // Vecteur c1->c2
      const dx = c2.x - c1.x;
      const dy = c2.y - c1.y;
      const len = Math.sqrt(dx * dx + dy * dy);

      // Normale unitaire vers l'extérieur (inverser si c’est dedans)
      let nx = -dy / len;
      let ny = dx / len;

      // Les deux points décalés
      const c1b = { x: c1.x + nx * d, y: c1.y + ny * d };
      const c2b = { x: c2.x + nx * d, y: c2.y + ny * d };

      offsetEdges.push([c1b, c2b]);
    }

    // 2) Calcul de l’intersection offsetCorner[i]
    //    entre offsetEdges[i-1] et offsetEdges[i]
    function lineIntersect(A, B, C, D) {
      // Intersection du segment AB avec CD (en coordonnées)
      // Retourne {x, y} ou null si parallèle
      const a1 = B.y - A.y;
      const b1 = A.x - B.x;
      const c1 = a1 * A.x + b1 * A.y;

      const a2 = D.y - C.y;
      const b2 = C.x - D.x;
      const c2 = a2 * C.x + b2 * C.y;

      const det = a1 * b2 - a2 * b1;
      if (Math.abs(det) < 1e-9) {
        return null; // lignes parallèles ou quasi
      }
      return {
        x: (b2 * c1 - b1 * c2) / det,
        y: (a1 * c2 - a2 * c1) / det
      };
    }

    const offsetCorners = [];
    for (let i = 0; i < 6; i++) {
      const ePrev = offsetEdges[(i + 5) % 6]; // côté précédent
      const eCurr = offsetEdges[i];

      // Intersection
      const inter = lineIntersect(
        ePrev[0], ePrev[1],  // (c_{i-1}b, c_i b)
        eCurr[0], eCurr[1]   // (c_i b, c_{i+1}b)
      );
      offsetCorners[i] = inter;
    }

    // 4) Ajouter un <foreignObject> pour le contenu texte au centre
    const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute('width', this._radius * 2);
    foreignObject.setAttribute('height', this._radius * 2);
    foreignObject.setAttribute('x', this.x - this._radius);
    foreignObject.setAttribute('y', this.y - this._radius);

    const body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    const div = document.createElement('div');
    div.classList.add('hex-content');
    div.style.width = this._radius * 2 + 'px';
    div.style.height = this._radius * 2 + 'px';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.innerHTML = this.content;

    body.appendChild(div);
    foreignObject.appendChild(body);
    group.appendChild(foreignObject);

    // Event sur l’hexagone
    group.addEventListener('click', () => {
      console.log(`Hex ${this.col},${this.row} cliqué !`);
    });

    this.drawSides(group, corners, offsetCorners);

    return group;
  }

  drawSides(group, corners, offsetCorners) {
    // 3) Génération des 6 trapèzes
    for (let i = 0; i < 6; i++) {
      const c1 = corners[i];
      const c2 = corners[(i + 1) % 6];
      const C1 = offsetCorners[i];
      const C2 = offsetCorners[(i + 1) % 6];

      // On construit le trapèze c1 -> c2 -> C2 -> C1
      if (C1 && C2) {
        const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const pts = [
          `${c1.x},${c1.y}`,
          `${c2.x},${c2.y}`,
          `${C2.x},${C2.y}`,
          `${C1.x},${C1.y}`
        ].join(' ');
        poly.setAttribute('points', pts);
        poly.setAttribute('fill', "black");
        poly.classList.add('hex-trapeze');
        group.appendChild(poly);


        const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreignObject.setAttribute('width', 0.8 * this._radius);
        foreignObject.setAttribute('height', 0.2 * this._radius);
        foreignObject.setAttribute('x', c1.x);
        foreignObject.setAttribute('y', c1.y);
        foreignObject.style.width = `${0.8 * this._radius}px`;
        foreignObject.style.height = `${0.2 * this._radius}px`;
        foreignObject.style.transformOrigin = `${c1.x}px ${c1.y}px`;

        let content = `⬇️${i}`;
        switch (i) {
          case 0:
            foreignObject.style.transformOrigin = `${c1.x -0.2 * this._radius - 3}px ${c1.y}px`;
            foreignObject.setAttribute('x', c1.x - this._radius - 3);
            foreignObject.setAttribute('y', c1.y - 0.2 * this._radius);
            foreignObject.style.transform = `rotate(300deg) translateY(${0.2 * this._radius}px)`;
            break;
          case 1:
            foreignObject.style.transform = `
              translateY(-${0.2 * this._radius}px)
              translateX(${this._radius * -0.9}px)
            `;

            break;
          case 2:
            foreignObject.style.transform = `
              translateY(-${this._radius - this._radius * 0.1 - 3}px)
              translateX(${this._radius * -0.3 + 3}px)
              rotate(60deg)
            `;
            break;
          case 3:
            foreignObject.style.transform = `
              rotate(300deg)
              translateX(${this._radius * 0.1}px)
            `;
            content = `⬆️${i}`;
            break;

          case 4:
            foreignObject.style.transform = `translateX(${this._radius * 0.1}px)`;
            content = `⬆️${i}`;
            break;
          case 5:
            foreignObject.setAttribute('x', foreignObject.getAttribute('x') + this._radius * 0.2);
            foreignObject.style.transform = `rotate(60deg) translateX(${this._radius * 0.1}px)`;
            content = `⬆️${i}`;
            break;

        }

        const body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
        body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        body.style.backgroundColor = '#ff05';
        const div = document.createElement('div');
        div.classList.add('side-content');
        div.style.position='absolute';
        div.style.width = `${0.8 * this._radius}px`;
        div.style.height = `${0.2 * this._radius}px`;

        div.style.zIndex = 1000;
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.innerHTML = content;

        body.appendChild(div);
        foreignObject.appendChild(body);
        group.appendChild(foreignObject);
      }
    }
  }
}
