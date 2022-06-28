import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Account } from "./account.model";

@Entity("bonos")
export class Honorary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  precioAtual: string;

  @Column()
  utilidadoPerdida: string;

  @Column()
  duracion: string;

  @Column()
  convexidad: string;

  @Column()
  total: string;

  @Column()
  duracionModificada: string;
  
  @Column()
  VAN: string;
  
  @Column()
  TIR: string;
  

  @ManyToOne(() => Account, (account) => account.honoraries)
  account: Account;
}
