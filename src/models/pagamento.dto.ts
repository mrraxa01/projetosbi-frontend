export interface PagamentoDTO{
  //o nome dos parametros deve ser igual do backend
  numeroDeParcelas: number;
  //como o parametro @type começa com @, deve-se colocá-lo entre aspas
  "@type": string;

}
