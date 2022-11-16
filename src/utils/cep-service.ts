import { ViaCEPAddress } from "@/protocols";
import { request } from "./request";

async function getAddress(cep: string): Promise<ViaCEPAddress> {
  const result = await request.get(`https://viacep.com.br/ws/${cep}/json/`);
  return result.data;
}

export {
  getAddress,
};
