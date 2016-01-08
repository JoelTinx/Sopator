var lstWord = [], txtPal, lstPal;

function init()
{
    txtPal = document.getElementById("txtPalabra");
    lstPal = document.getElementById("lstPalabras");
    txtPal.addEventListener("keypress", enter);
}

function enter(evt)
{
    if(evt.keyCode==13)
        addWord();
}

function addWord()
{
    if(txtPal.value.length > 0)
    {
        lstWord.push(txtPal.value.replace(" ", "").toUpperCase());
        cargaLista(txtPal.value.replace(" ", "").toUpperCase());
        txtPal.value = "";
    }
    else
    {
        alert("Ingrese una palabra.");
    }
}

function cargaLista(x_str)
{
    var nuevo = document.createElement("option");
    nuevo.innerHTML = x_str;
    lstPal.appendChild(nuevo);
}

function getPalabras()
{
    return lstWord;
}

function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else
        return true;
}

function showText(l_display)
{
    document.getElementById("txtOutput").innerHTML = sopator.toString();
}
