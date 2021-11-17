import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Account } from '../models/account.model';

export const createUsers = async(req: Request, res: Response) => {

    const users = await getRepository(Account).find();

    const { fechaEmision, fechaPago, totalRecibir, retencion, diasxAnio, plazoTaza, tasaEfectiva, fechaDescuento,CyGI,resta, periodoCapital, tasaNominal  } = req.body;

    const tasaEfectivaAnual = TEA(tasaEfectiva, diasxAnio, plazoTaza, periodoCapital,tasaNominal );
    // 2 = diastranscurridos
    const tasaEfectivaXdias = TasaEfectiva(tasaEfectivaAnual,2, diasxAnio);

    const tasaDescontada = TasaDescontada(tasaEfectivaXdias);

    const descuentoTotal = Descuentototal(totalRecibir, tasaDescontada);

    const retencionRt = RetencionCal(totalRecibir, retencion);

    const valorNeto = ValorNeto(totalRecibir, descuentoTotal);

    const valorTotalRecibirVR = ValorTotalRecibirVR(valorNeto, retencion, CyGI);
    
    const valorTotalEntregarVE = valorTotalEntregar(totalRecibir, retencion, resta);

    const tasaCosteEfectivaAnual = TCostoEAnual(valorTotalEntregarVE,valorTotalRecibirVR,diasxAnio,2);

    // const diastrans = Diastrans(fechaPago,fechaEmision);

    return res.json({
        msg: 'resultado',
        tasa_efectiva_anual: tasaEfectivaAnual,
        tasa_efectiva:tasaEfectivaXdias,
        tasa_descontada:tasaDescontada,
        descuento_total:descuentoTotal,
        retencionRt:retencionRt,
        valor_neto:valorNeto,
        valor_total_recibir_vr:valorTotalRecibirVR,
        valor_total_entregar_ve:valorTotalEntregarVE,
        tcea:tasaCosteEfectivaAnual,
        // dias_trans:diastrans
    })


}

export const createUsuario = async(req: Request, res: Response) => {
    return res.json({
        body: req.body
    })
}


const aprox7digit = (result:any) => {
    return Math.round(result*10000000)/10000000;
}
const aprox2digit = (result:any) => {
    return Math.round(result*100)/100;
}

const TEA = (tasaEfectiva: any,diasxAnio:any,plazoTasa:any,periodoCapital:any,tasaNominal:any  ) => {
    let result = 0;
    if(tasaEfectiva!=null) {
        result=(Math.pow(1.00+(tasaEfectiva*1.0/100.0), diasxAnio*1.0/plazoTasa*1.0) -1.00)*100.0;
    }
    else {	
    let m=plazoTasa*1.0/(periodoCapital*1.0);
    let n=diasxAnio*1.0/(periodoCapital*1.0);
        result=(Math.pow(1.00+((tasaNominal*1.0/100.0)/m),n )-1.00)*100.0;
    }
    const tea=aprox7digit(result);
    return tea;
}

const Diastrans = (fechaPago:any, fechaDescuento:any) => {
    return ((fechaPago.getTime()-fechaDescuento.getTime())/86400000);
}

	/*------------------------*/
const FpagoMenosFemision = (fechaPago:any, fechaEmision:any) => {
    let dias=((fechaPago.getTime()-fechaEmision.getTime())/86400000);
	return dias;
}
const FepagoMenosFDescuento = (fechaPago:any, fechaEmision:any) => {
    let dias=((fechaPago.getTime()-fechaEmision.getTime())/86400000);
	return dias;
}

/*----------------------*/
const TasaEfectiva = (tea:any, diastrans:any, diasxAnio:any) => {
    let result=(Math.pow((1.00+(tea*1.0/100.0)), diastrans*1.0/(diasxAnio*1.0)) - 1.00)*100.0 ;
    // let tasaefectivaXdias=aprox7digit(result);
    return result;
}

const TasaDescontada = (tasaefectivaXdias:any) => {
    let result=((tasaefectivaXdias*1.0/100.0)/(1+(tasaefectivaXdias*1.0/100.0)))*100.0;
    return result;
}
const Descuentototal = (tRecibir:any, tasaDescontada:any) => {
   let result=tRecibir*(tasaDescontada*1.0/100.0);
    return result;
}
const ValorNeto = (tRecibir:any, Descuento:any) => {
    let result=tRecibir-Descuento;
    // vNeto=aprox2digit(result);
    return result;
}
const RetencionCal = (tRecibir:any, retencionInput:any) => {
    let temp = retencionInput;
    if (tRecibir>1500) {
        temp=tRecibir*1.0*0.08;
    }
    else {
        temp=0.0;
    }
    return temp;
}

const ValorTotalRecibirVR = (vNeto:any, retencion:any, CyGI:any) => {
    let result=vNeto-retencion;
    result=result-CyGI;//menos costos y gastos iniciales
    const vRecibir=aprox2digit(result);
    return vRecibir;
}

const valorTotalEntregar = (tRecibir:number, retencion:number, CyGFee:number) => {
    const result:number=tRecibir-retencion
    let vEntregar=aprox2digit(Number(result)+Number(CyGFee));
    return vEntregar;
}

const TCostoEAnual = (vEntregar:any, vRecibir:any, diasxAnio:any,diastrans:any ) => {
    const result=(Math.pow(vEntregar*1.0/vRecibir*1.0, diasxAnio*1.0/(diastrans*1.0)) -1.00)*100.0;
    const TCEA=aprox7digit(result);
    return TCEA;

}