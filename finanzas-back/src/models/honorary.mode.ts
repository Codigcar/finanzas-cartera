import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Account } from "./account.model";

@Entity("honoraries")
export class Honorary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tasaEfectivaAnual: number;

  @Column()
  tasaEfectivaXdias: number;

  @Column()
  tasaDescontada: number;

  @Column()
  descuentoTotal: number;

  @Column()
  retencionRt: number;

  @Column()
  valorNeto: number;

  @Column()
  valorTotalRecibirVR: number;

  @Column()
  valorTotalEntregarVE: number;

  @Column()
  tasaCosteEfectivaAnual: number;


  @ManyToOne(() => Account, (account) => account.honoraries)
  account: Account;
}
