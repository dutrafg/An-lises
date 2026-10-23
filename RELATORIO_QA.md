# QA — Análises Headless 0.1.0

Data: 23/10/2026. Base: EvoluFísico2 2.0.1.

- Escopo restrito aos oito motores; sem interface, banco, rede, PDF ou formulários.
- 13 testes funcionais aprovados, incluindo `worker_threads`.
- Campanha adicional de 10.000 históricos sintéticos: 7.000 liberados, 3.000 bloqueados, zero falhas registradas.
- Identidade divergente, datas repetidas, números malformados, troca de método e massa impossível exercitados.
- Verificados determinismo e preservação das entradas na bateria funcional.
- Sem teste em navegador nem hardware físico, sem certificação clínica das equações.
- Worker apenas processa mensagens quando iniciado pelo software consumidor.
