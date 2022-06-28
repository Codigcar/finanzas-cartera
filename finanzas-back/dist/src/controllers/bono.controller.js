"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHonorariesByUserId = exports.createBono = void 0;
const typeorm_1 = require("typeorm");
const honorary_mode_1 = require("../models/honorary.mode");
const createBono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { VNominal, VComercial, NA, //numero de anios
    Fcupon, // Frecuencia cupon
    DXA, // DiasxAnios
    TDeTasa, // Tipo de interes , Efectiva o Nominal
    Capit, // Capitlizacion, if (TDeTasa == Nominal)
    TI, // Tasa de interes
    TAD, // TAsa anual de descuento
    IR, // Importe a la renta
    FEmision, // Fecha de Emision
    inv, // Inversion
     } = req.body;
    TI = (TI * 1.0) / 100;
    console.log({ TI });
    TAD = (TAD * 1.0) / 100;
    console.log({ TAD });
    IR = (IR * 1.0) / 100;
    console.log({ IR });
    let CE = (VComercial * 2.2) / 100;
    console.log({ CE });
    let CB = (VComercial * 0.95) / 100;
    console.log({ CB });
    let FreCupon = 0;
    switch (Fcupon) {
        case 'm':
            FreCupon = 30;
            break;
        case 'b':
            FreCupon = 60;
            break;
        case 't':
            FreCupon = 90;
            break;
        case 'c':
            FreCupon = 120;
            break;
        case 's':
            FreCupon = 180;
            break;
        case 'a':
            FreCupon = 360;
            break;
        default:
            break;
    }
    console.log({ FreCupon });
    let DiasCapt = 0;
    switch (Capit) {
        case 'd':
            DiasCapt = 1;
            break;
        case 'q':
            DiasCapt = 15;
            break;
        case 'm':
            DiasCapt = 30;
            break;
        case 'b':
            DiasCapt = 60;
            break;
        case 't':
            DiasCapt = 90;
            break;
        case 'c':
            DiasCapt = 120;
            break;
        case 's':
            DiasCapt = 180;
            break;
        case 'a':
            DiasCapt = 360;
            break;
        default:
            break;
    }
    console.log({ DiasCapt });
    let PerAnno = (DXA * 1.0) / (FreCupon * 1.0);
    console.log({ PerAnno });
    let TPeriodo = (PerAnno * NA);
    console.log({ TPeriodo });
    let TEA = 0.0;
    switch (TDeTasa) {
        case "e":
            TEA = TI;
            break;
        case "n":
            TEA = (Math.pow((1 + TI / (DXA / DiasCapt)), (DXA / DiasCapt)) - 1);
            break;
        default:
            break;
    }
    console.log({ TEA });
    let TEP = Math.pow((1 + TEA), (FreCupon / DXA)) - 1;
    console.log({ TEP });
    let COK = Math.pow((1 + TAD), (FreCupon / DXA)) - 1;
    console.log({ COK });
    let PrecioA = 0;
    let contador = 1;
    while (contador <= TPeriodo) {
        if (contador == TPeriodo) {
            PrecioA = ((VNominal * TEP + VNominal * 1 / 100 + VNominal) / Math.pow((1 + COK), contador)) + PrecioA;
        }
        else {
            PrecioA = ((VNominal * TEP) / Math.pow((1 + COK), contador)) + PrecioA;
        }
        contador++;
    }
    console.log({ PrecioA });
    let Utiper = PrecioA - (VComercial + CB);
    let valor1 = 0.0;
    let valor2 = 0.0;
    let valor3 = 0.0;
    contador = 1;
    while (contador <= TPeriodo) {
        if (contador == TPeriodo) {
            valor1 = ((VNominal * TEP + (VNominal / 100) + VNominal) / Math.pow((1 + COK), contador)) + valor1;
            valor2 = (((VNominal * TEP + (VNominal / 100) + VNominal) / Math.pow((1 + COK), contador)) * contador * FreCupon / DXA) + valor2;
            valor3 = ((VNominal * TEP + (VNominal / 100) + VNominal) / Math.pow((1 + COK), contador)) * contador * (contador + 1) + valor3;
        }
        else {
            valor1 = ((VNominal * TEP) / Math.pow((1 + COK), contador)) + valor1;
            valor2 = (((VNominal * TEP) / Math.pow((1 + COK), contador)) * contador * FreCupon / DXA) + valor2;
            valor3 = ((VNominal * TEP) / Math.pow((1 + COK), contador)) * contador * (contador + 1) + valor3;
        }
        contador++;
    }
    console.log({ contador });
    console.log({ valor2 });
    console.log({ valor1 });
    let Duracion = valor2 / valor1;
    console.log({ Duracion });
    let Convexidad = valor3 / (Math.pow((1 + COK), 2) * valor1 * Math.pow((DXA / FreCupon), 2));
    console.log({ Convexidad });
    let Total = Duracion + Convexidad;
    console.log({ Total });
    let DuracionM = Duracion / (1 + COK);
    console.log({ DuracionM });
    console.log('Precio Actual: S/', PrecioA);
    let VAN = inv - PrecioA;
    return res.json({
        ok: true,
        body: {
            precioActual: PrecioA,
            utilidad_o_Perdida: Utiper,
            duracion: Duracion,
            convexidad: Convexidad,
            total: Total,
            duracionModificada: Duracion,
            VAN: VAN,
        }
    });
    // const TEA = (
    //   tasaEfectiva: any,
    //   diasxAnio: any,
    //   plazoTasa: any,
    //   periodoCapital: any,
    //   tasaNominal: any,
    //   tasa:any
    // ) => {
    //   let result = 0;
    //   if ( tasa == "Efectiva") {
    //     result = (Math.pow(1.0 + (tasaEfectiva * 1.0) / 100.0,((diasxAnio * 1.0) / plazoTasa) * 1.0
    //       ) -
    //         1.0) *
    //       100.0;
    //   } else {
    //     if(tasa == "Nominal"){
    //       let m = (plazoTasa * 1.0) / (periodoCapital * 1.0);
    //       let n = (diasxAnio * 1.0) / (periodoCapital * 1.0);
    //       result = (Math.pow(1.0 + (tasaNominal * 1.0) / 100.0 / m, n) - 1.0) * 100.0;
    //     }
    //   }
    //   // const tea = aprox7digit(result);
    //   const tea = result.toFixed(7);
    //   return tea;
    // };
    // const tasaEfectivaAnual = TEA(
    //   tasaEfectiva,
    //   diasxAnio,
    //   plazoTaza,
    //   periodoCapital,
    //   tasaNominal,
    //   tasa
    // );
    // // 2 = diastranscurridos
    // const tasaEfectivaXdias = TasaEfectiva(
    //   tasaEfectivaAnual,
    //   diasTranscurridos,
    //   diasxAnio
    // );
    // const tasaDescontada = TasaDescontada(tasaEfectivaXdias);
    // const descuentoTotal = Descuentototal(totalRecibir, tasaDescontada);
    // const retencionRt = RetencionCal(totalRecibir, retencion);
    // const valorNeto = ValorNeto(totalRecibir, descuentoTotal);
    // const valorTotalRecibirVR = ValorTotalRecibirVR(valorNeto, retencion, CyGI);
    // const valorTotalEntregarVE = valorTotalEntregar(
    //   totalRecibir,
    //   retencion,
    //   CyGF
    // );
    // const tasaCosteEfectivaAnual = TCostoEAnual(
    //   valorTotalEntregarVE,
    //   valorTotalRecibirVR,
    //   diasxAnio,
    //   diasTranscurridos
    // );
    // //guardar BD
    // if (save === 1) {
    //   const newHonorary = getRepository(Honorary).create({
    //     tasaEfectivaAnual,
    //     diasTranscurridos: diasTranscurridos.toFixed(),
    //     tasaEfectivaXdias,
    //     tasaDescontada,
    //     descuentoTotal,
    //     retencionRt: retencionRt.toFixed(),
    //     valorNeto,
    //     valorTotalRecibirVR,
    //     valorTotalEntregarVE,
    //     tasaCosteEfectivaAnual,
    //     retencionInput: retencion,
    //     fechaEmision,
    //     fechaPago,
    //     fechaDescuento,
    //     CyGI: CyGI.toFixed(),
    //     CyGF: CyGF.toFixed(),
    //     account: accountId,
    //   });
    //   const results = await getRepository(Honorary).save(newHonorary);
    //   return res.json({
    //     ok: true,
    //     body: results,
    //   });
    // } else {
    //   return res.json({
    //     ok: true,
    //     body: {
    //       tasaEfectivaAnual,
    //       diasTranscurridos: diasTranscurridos.toFixed(),
    //       tasaEfectivaXdias,
    //       tasaDescontada,
    //       descuentoTotal,
    //       retencionRt: retencionRt.toFixed(),
    //       valorNeto,
    //       valorTotalRecibirVR,
    //       valorTotalEntregarVE,
    //       tasaCosteEfectivaAnual ,
    //       retencionInput: retencion,
    //       fechaEmision,
    //       fechaPago,
    //       fechaDescuento,
    //       CyGI: CyGI.toFixed(),
    //       CyGF: CyGF.toFixed(),
    //       account: accountId,
    //     },
    //   });
    // }
});
exports.createBono = createBono;
const getHonorariesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const honoraries = await getRepository(Honorary).find();
        const { accountId } = req.body;
        const honoraries = yield (0, typeorm_1.getRepository)(honorary_mode_1.Honorary)
            .createQueryBuilder("honoraries")
            .where("honoraries.accountId = :accountId ", { accountId: accountId })
            .getMany();
        return res.json({
            ok: true,
            body: honoraries,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            body: "Contactese con el administrador",
        });
    }
});
exports.getHonorariesByUserId = getHonorariesByUserId;
const aprox2digit = (result) => {
    return Math.round(result * 100) / 100;
};
// const TEA = (
//   tasaEfectiva: any,
//   diasxAnio: any,
//   plazoTasa: any,
//   periodoCapital: any,
//   tasaNominal: any,
//   tasa:any
// ) => {
//   let result = 0;
//   if ( tasa == "Efectiva") {
//     result =
//       (Math.pow(
//         1.0 + (tasaEfectiva * 1.0) / 100.0,
//         ((diasxAnio * 1.0) / plazoTasa) * 1.0
//       ) -
//         1.0) *
//       100.0;
//   } else {
//     if(tasa == "Nominal"){
//       let m = (plazoTasa * 1.0) / (periodoCapital * 1.0);
//       let n = (diasxAnio * 1.0) / (periodoCapital * 1.0);
//       result = (Math.pow(1.0 + (tasaNominal * 1.0) / 100.0 / m, n) - 1.0) * 100.0;
//     }
//   }
//   // const tea = aprox7digit(result);
//   const tea = result.toFixed(7);
//   return tea;
// };
// /*----------------------*/
// const TasaEfectiva = (tea: any, diastrans: any, diasxAnio: any) => {
//   let result =
//     (Math.pow(
//       1.0 + (tea * 1.0) / 100.0,
//       (diastrans * 1.0) / (diasxAnio * 1.0)
//     ) -
//       1.0) *
//     100.0;
//   return result.toFixed(7);
// };
// const TasaDescontada = (tasaefectivaXdias: any) => {
//   let result =
//     ((tasaefectivaXdias * 1.0) /
//       100.0 /
//       (1 + (tasaefectivaXdias * 1.0) / 100.0)) *
//     100.0;
//   return result.toFixed(7);
// };
// const Descuentototal = (tRecibir: any, tasaDescontada: any) => {
//   let result = tRecibir * ((tasaDescontada * 1.0) / 100.0);
//   return result.toFixed(2);
// };
// const ValorNeto = (tRecibir: any, Descuento: any) => {
//   let result = tRecibir - Descuento;
//   return result.toFixed(2);
// };
// const RetencionCal = (tRecibir: any, retencionInput: any) => {
//   let temp = retencionInput;
//   if (tRecibir > 1500) {
//     temp = tRecibir * 1.0 * 0.08;
//   } else {
//     temp = 0.0;
//   }
//   return temp;
// };
// const ValorTotalRecibirVR = (vNeto: any, retencion: any, CyGI: any) => {
//   let result = vNeto - retencion;
//   result = result - CyGI; //menos costos y gastos iniciales
//   const vRecibir = aprox2digit(result);
//   return vRecibir.toFixed(2);
// };
// const valorTotalEntregar = (
//   tRecibir: number,
//   retencion: number,
//   CyGF: number
// ) => {
//   const result: number = tRecibir - retencion;
//   let vEntregar = aprox2digit(Number(result) + Number(CyGF));
//   return vEntregar.toFixed(2);
// };
// const TCostoEAnual = (
//   vEntregar: any,
//   vRecibir: any,
//   diasxAnio: any,
//   diastrans: any
// ) => {
//   let result =
//     (Math.pow(
//       ((vEntregar * 1.0) / vRecibir) * 1.0,
//       (diasxAnio * 1.0) / (diastrans * 1.0)
//     ) -
//       1.0) *
//       100.0;
//   return result.toFixed(7);
//   /* 
//   let result =
//     (Math.pow(
//       ((vEntregar * 1.0) / vRecibir) * 1.0,
//       (diasxAnio * 1.0) / (diastrans * 1.0)
//     ) -
//       1.0) /
//       100000000000;
//   return result.toFixed(7); */
// };
//# sourceMappingURL=bono.controller.js.map