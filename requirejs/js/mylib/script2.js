// Script2 dipende da script1. Il primo argomento è un'array contenente 
// le dipendenze di script2. Nota che script1 può essere utilizzato all'interno di script2,
// passandolo come argomento della funzione. L'ordine degli argomenti della funzione deve
// corrispondere all'ordine delle dipendenze.
// La funzione è caricata da define quando le dipendenze sono state caricate.
define(["mylib/script1"], function (script1) {
    //Do initScript2() work that only concerns script2-a here. Use
    //script1 as needed.
    return {test: 'script2 ' + script1};
});