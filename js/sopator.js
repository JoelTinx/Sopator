/*
* sopator.js
*
* Este es un pequeño motor para generar sopas de letras, esta en su versión más básica
* es por ello que se podran encotrar multiples errores o malas practicas de codificación.
* El algorito ha sido escrito en su totalidad por el autor.
*
* MIT Licensed.
*
* Copyright 2015 Joel Tinx (@joeltinx)
*
* ---------------------------------------------------
* author : Joel Tinx
* version: 0.0.2
*/
var sopator = (function(){
    var dirx = [[ 1, 0], [ 1,-1], [ 0,-1], [-1,-1], [-1, 0], [-1, 1], [ 0, 1], [ 1, 1]];

    var dirs = [[ 0, 0], [ 0.3, 1], [ 0.75, 1], [ 0.35, 0.9], [ 1, 0], [ 0.4, -0.2], [ 0.75, 0], [ 0.35, -0.2]];

    var nSize = 25;
    var nAlto = 520;
    var nAncho = 520;
    var palabras = [];
    var tablero = [], tableroBk = [];
    var caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var espacio = 24;
    var canvas, lienzo;

    var listaBk = [];

    function generate(){
        nSize  = document.getElementById("nSize").value;
        canvas = document.getElementById("lienzo");
        nAncho = nSize * espacio + 20;
        nAlto  = nSize * espacio + 20;
        canvas.setAttribute("width", nAncho);
        canvas.setAttribute("height", nAlto + 110);
        lienzo = canvas.getContext("2d");
        palabras = getPalabras().slice(0);
        listaBk = [];

        if(palabras.length > 0)
        {
            //Generar Sopa de Letras
            initTablero();
            distribuir();
            //Dibujar Sopa de Letras Generada
            colorFondo();
            dibuja();
            paintListWords();
        }
        else
        {
            alert("Debe ingresar por lo menos una palabra");
        }
    }

    function initTablero()
    {
        for(var i=0; i < nAlto; i++)
        {
            tablero[i] = [];
            for(var j=0; j<nAncho; j++)
            {
                tablero[i][j] = "*";
            }
        }
    }

    function distribuir()
    {
        for(var i=0; i<palabras.length; i++)
        {
            var x = parseInt(Math.floor(Math.random() * nSize));
            var y = parseInt(Math.floor(Math.random() * nSize));
            var r = parseInt(Math.floor(Math.random() * 8));

            if(valida(palabras[i], x, y, dirx[r]))
            {
                listaBk.push([x, y, dirx[r]]);
                insertar(palabras[i], x, y, dirx[r]);
            }
            else
            {
                i--;
            }
        }
    }

    function valida(palabra, xi, yi, dir)
    {
        var len = palabra.length;
        var lReturn = false;

        if(xi + len * dir[0] > 0 && xi + len * dir[0] < nSize && yi + len * dir[1] > 0 && yi + len * dir[1] < nSize)
        {
            for(var i=0; i<len; i++)
            {
                if(tablero[xi + i * dir[0]][yi + i * dir[1]] == "*" || tablero[xi + i * dir[0]][yi + i * dir[1]] == palabra.charAt(i))
                {
                    lReturn = true;
                }
                else
                {
                    lReturn = false;
                    break;
                }
            }
        }
        else
        {
            lReturn = false;
        }

        return lReturn;
    }

    function insertar(palabra, xi, yi, dir)
    {
        for(var i=0; i<palabra.length; i++)
            tablero[xi + i * dir[0]][yi + i * dir[1]] = palabra.charAt(i);
    }

    function colorFondo()
    {
        //Fondo
        lienzo.beginPath();
        lienzo.fillStyle = "#FFF";
        lienzo.fillRect(0, 0, nAncho, nAlto + 110);
        lienzo.closePath();
        lienzo.fill();

        //Borde
        lienzo.beginPath();
        lienzo.strokeStyle = "#000";
        lienzo.strokeRect(0, 0, nAncho, nAlto + 110);
        lienzo.closePath();
        lienzo.fill();
    }

    function dibuja()
    {
        var len = caracteres.length;
        for(var i=0; i<nSize; i++)
        {
            tableroBk[i] = [];
            for(var j=0; j<nSize; j++)
            {
                var tmp;
                if(tablero[i][j] == "*")
                {
                    tmp = caracteres.charAt(parseInt(Math.floor(Math.random() * len)));
                }
                else
                {
                    tmp = tablero[i][j];
                }

                tableroBk[i][j] = tmp;

                lienzo.beginPath();
                lienzo.font = "13pt Tahoma";
                lienzo.fillStyle = "#000";
                lienzo.fillText(tmp, 15 + (i * espacio), 30 + (j * espacio));
                lienzo.closePath();
                lienzo.fill();
            }
        }
    }

    function paintListWords()
    {
        lienzo.beginPath();
        lienzo.fillRect(10, nAlto - 5, nAncho - 20, 10);
        lienzo.closePath();

        var col = 0;
        var row = 0;

        for(var i=1; i<=palabras.length; i++)
        {
            lienzo.beginPath();
            lienzo.font = "10pt Tahoma";
            lienzo.fillText(palabras[i-1], 10 + col * 150, nAlto + (20 * row) + espacio);
            lienzo.closePath();
            lienzo.fill();
            row++;
            if(i % 5 === 0)
            {
                col++;
                row = 0;
            }

        }
    }

    function solve2() {
      for (var i = 0; i < listaBk.length; i++) {
        var ix = equiv(listaBk[i][2]);
        rectangulo(lienzo,
                   11 + listaBk[i][0] * espacio + (dirs[ix][0] * espacio),
                   15 + listaBk[i][1] * espacio + (dirs[ix][1] * espacio),
                   palabras[i].length * espacio * listaBk[i][2][0],
                   palabras[i].length * espacio * listaBk[i][2][1],
                   18,
                   listaBk[i][2][0],
                   listaBk[i][2][1]
                 );
      }
    }

    function clean() {
        colorFondo();
        tablero = tableroBk.slice();
        dibuja();
        paintListWords();
    }

    function equiv(dir) {
      var ix = 0;
      for (var i = 0; i < dirx.length; i++) {
        if (dirx[i][0] === dir[0] && dirx[i][1] === dir[1]) {
          ix = i;
          break;
        }
      }
      return ix;
    }

    function rectangulo(ctx, xi, yi, x, y, h, a, b) {
      var alfa;
      if ((Math.abs(a) + Math.abs(b)) == 2)
      {
        alfa = Math.PI/4;
        x *= 0.92;
        y *= 0.92;
      }
      else
      {
        if(Math.abs(a) == 1)
        {
          alfa = Math.PI/2;
        }
        else if(Math.abs(b) == 1)
        {
          alfa = 0;
        }
      }

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
      ctx.fillStyle = "rgba(255, 255, 0, 0.25)";
      ctx.moveTo(xi, yi);
      ctx.lineTo(xi + x, yi + y);
      ctx.lineTo(xi + x -  (a === 0 ? 1 : a) * h * Math.cos(alfa), yi + y +  (b === 0 ? 1 : b) * h * Math.sin(alfa));
      ctx.lineTo(xi - (a === 0 ? 1 : a) * h * Math.cos(alfa), yi + (b === 0 ? 1 : b) * h * Math.sin(alfa));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    function save()
    {
        var canvx = document.getElementById("lienzo");
        window.open(canvx.toDataURL(),"Pupiletras","left=0,top=0,width=" + nAncho + ",height=" + nAlto +",toolbar=0,resizable=0");
    }

    function toString()
    {
        var cad = "";
        for(var i=0; i<nSize; i++)
        {
            for(var j=0; j<nSize; j++)
            {
                cad += tableroBk[j][i] + " ";
            }
            cad += "\n";
        }

        cad += "\nPalabras:\n";

        for(var k=0; k<palabras.length; k++)
        {
            cad += palabras[k] + "\n";
        }

        cad += "\n\nSi haz generado tu sopa de letras con este aplicativo, no olvides recomendarlo a tus amigos y mencionarnos. Gracias";

        return cad;
    }

    return {
        generate: generate,
        solve2:   solve2,
        save:     save,
        clean:    clean,
        toString: toString,
        palabras: palabras
    };
})();
