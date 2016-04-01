﻿// Copyright (c) 2002 SERPRO
// Developed by Lucas Martins do Amaral, MSc
//
// 15/07/2002
//


function a(num) {
alert('Entrou ' + num);
}

function TrimLeft(str)  {
var strIn;
    strIn = new String(str);
    for(i = 0; i < strIn.length; i++)   {
        if( strIn.charAt(i) != ' ' )
            break;
    }
    return strIn.substr(i);
}

function TrimRight(str) {
var strIn;
    strIn = new String(str);
    for(i = strIn.length - 1; i > 0 ; i--)  {
        if( strIn.charAt(i) != ' ' )
            break;
    }
    return strIn.substring(0, i+1);
}

function EliminarANDORNEAR(str) {
var strRes = new String(str);
    what = /[ ]AND[ ]/gi;
    strRes = strRes.replace(what, '');
    what = /[ ]OR[ ]/gi;
    strRes = strRes.replace(what, '');
    what = /[ ]NEAR[ ]/gi;
    strRes = strRes.replace(what, '');
    what = /[ ]+/g;
    strRes = strRes.replace(what, ' ');
    strRes = TrimLeft(strRes);
    strRes = TrimRight(strRes);
    return strRes;
}

function EliminarAspas(str) {
var strRes = new String(str);
    what = /\"/g;
    strRes = strRes.replace(what, '');
    what = /\'/g;
    strRes = strRes.replace(what, '');
    strRes = TrimLeft(strRes);
    strRes = TrimRight(strRes);
    return strRes;
}

function ORSearch(str)  {
var strRes = new String(str);
    what = /[ ]+/g;
    return strRes.replace(what, ' OR ');
}

function ANDSearch(str) {
var strRes = new String(str);
    what = /[ ]+/g;
    return strRes.replace(what, ' AND ');
}

function ExactSearch(str)   {
var strRes = new String(str);
    return '"' + strRes + '"';
}

function SubmeterPesquisaViaMenu() {
        var strText = new String(document.PesquisaSRF.Text2Search.value);
        var strPesquisa = new String('Exata');

        for( i = 0; i < document.PesquisaSRF.TipoPesquisa.length; i++ ) {
            if( document.PesquisaSRF.TipoPesquisa[i].checked == true )  {
                strPesquisa = new String(document.PesquisaSRF.TipoPesquisa[i].value);
                break;
            }
        }
        
        strText = EliminarAspas(strText);
        strText = EliminarANDORNEAR(strText);
        if( strText == '' )
            return false;
        
        if( strPesquisa == 'Todas' )    {
            strText = ANDSearch(strText);
        }
        else if(strPesquisa == 'Qualquer' ) {
            strText = ORSearch(strText);
        }
        else    {
            strText = ExactSearch(strText);
        }

        document.PesquisaSRF.TextRestrictionPlain.value = strText;
        //alert('[' + strText + ']');
        document.PesquisaSRF.action =  '/scripts/srf/pesquisa/srfpesquisa.idq';
        document.PesquisaSRF.submit();
}

function SubmeterBusca(strText ) {
    
    document.frmBuscaRapida.txtBusca.value = strText;
    strText = EliminarAspas(strText);
    strText = EliminarANDORNEAR(strText);

    
    document.frmBuscaRapida.hdnOrigem.value = document.location;
    
    
    document.frmBuscaRapida.hdnBusca.value = strText;
    
    
    document.frmBuscaRapida.action = '/busca/resultado.asp';
    
    document.frmBuscaRapida.submit();
}

function SubmeterBuscaRapida() {

//a(1);
    var strText = new String(document.frmBuscaRapida.txtBusca.value);
    
    strText = EliminarAspas(strText);
    strText = EliminarANDORNEAR(strText);

    //mostra('strText', strText);

    if( strText == '' ) {
        alert('Digite um texto para ser procurado.');
        return;
    }
    //strText = ExactSearch(strText);
    //document.BuscaSRF.Text2Search.value = '';
    document.frmBuscaRapida.hdnOrigem.value = document.location;
    
    //mostra('document.frmBuscaRapida.hdnOrigem.value', document.frmBuscaRapida.hdnOrigem.value);
    
    document.frmBuscaRapida.hdnBusca.value = strText;
    
    //mostra('document.frmBuscaRapida.hdnBusca.value', document.frmBuscaRapida.hdnBusca.value);
    
    document.frmBuscaRapida.action = '/busca/resultado.asp';
    //document.BuscaSRF.target = 'main';
    
    //mostra('document.frmBuscaRapida.action', document.frmBuscaRapida.action);
    
    document.frmBuscaRapida.submit();

}

function SubmeterPesquisa() {
    var strText = new String(document.frmBusca.txtBusca.value);
    
    if (strTexto = '') 
        alert('Digite uma palavra para pesquisar.');
    else if (!document.frmBusca.chkIrpf.checked && 
             !document.frmBusca.chkAdministracao.checked &&              
             !document.frmBusca.chkAlfandegas.checked &&             
             !document.frmBusca.chkPessoal.checked &&            
             !document.frmBusca.chkAcervo.checked) {
        alert('Selecione uma área para pesquisar.');
    }
    else {
        strText = EliminarAspas(strText);
        strText = EliminarANDORNEAR(strText);
        if( strText == '' ) {
            alert('Digite uma palavra para pesquisar.');
        }
        else {
            //strText = ExactSearch(strText);
            //document.BuscaSRF.Text2Search.value = '';
            document.frmBusca.hdnBusca.value = strText;
            document.frmBusca.action = '/busca/resultado.asp';
            //document.BuscaSRF.target = 'main';
            document.frmBusca.submit();
        }
    }
}

function SubmeterPesquisaAvancada() {
    var MyDate = document.PesquisaSRF.FMModDateAux.value; 
    document.PesquisaSRF.FMModDate.value = MyDate.substring(06,10) + "/" + MyDate.substring(03,05) + "/" + MyDate.substring(00,02);

    var strText = new String(document.PesquisaSRF.Text2Search.value);
    strText = EliminarAspas(strText);
    strText = EliminarANDORNEAR(strText);
    if( strText == '' ) {
        alert('O preenchimento do campo Texto é obrigatório!');
        return;
    }

    var strPesquisa = new String('Exata');
    for( i = 0; i < document.PesquisaSRF.TipoPesquisa.length; i++ ) {
        if( document.PesquisaSRF.TipoPesquisa[i].checked == true )  {
            strPesquisa = new String(document.PesquisaSRF.TipoPesquisa[i].value);
            break;
        }
    }
        
    strText = EliminarAspas(strText);
    strText = EliminarANDORNEAR(strText);
    if( strPesquisa == 'Todas' )    {
        strText = ANDSearch(strText);
    }
    else if(strPesquisa == 'Qualquer' ) {
        strText = ORSearch(strText);
    }
    else    {
        strText = ExactSearch(strText);
    }

    document.PesquisaSRF.TextRestrictionPlain.value = strText;
    document.PesquisaSRF.action =  '/scripts/srf/pesquisa/srfpesquisa.idq';
    document.PesquisaSRF.submit();
}

//-------------------------------
function isEmpty(s){
    return ((s == null) || (s.length == 0))
}

function LeTeclado(action)  {
    if(event.keyCode == 13 )    {
        SubmeterPesquisaViaMenu();
//      document.PesquisaSRF.target = '';
//      document.PesquisaSRF.action = action;
    }
    event.returnValue = true;
}