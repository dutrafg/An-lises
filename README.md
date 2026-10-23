# Análises — Núcleo EFIA 0.1.0 (Headless)

Projeto independente dos **oito motores EFIA** (EF68, EF70, EF77, EF78, EF79, EF80, EF81, EF82). **Sem interface gráfica, HTML, CSS, PWA, armazenamento, HTTP ou requisições de rede.**

## Execução

Requer Node.js 20+. Sem dependências externas.

- `npm test`: validações funcionais e execução em Worker Thread.
- `npm run test:stress`: 10.000 históricos sintéticos.
- `npm run example`: exemplo JSON completo.
- `cat examples/historico.json | node cli.js`: entrada por stdin.

API: `const {analyze,EF77}=require('./index.js');`
`analyze({profileKey:'aluno-001',selectedIds:['1','2','3'],records:[/* avaliações */]})` retorna objeto JSON com `engines.EF68` até `engines.EF82`.

Para execução em segundo plano: `new Worker(require('node:path').resolve('worker.js'))`, enviar `{jobId,request}`; receber `{jobId,success,result}`.
O aplicativo consumidor decide quando executar; não há processo de análise contínuo por padrão.

## Regras e proteção

- Três ou quatro datas válidas para cada aluno, intervalo mínimo de 21 dias e ao menos sete dias entre as duas últimas coletas.
- Rejeição de identidade divergente, datas duplicadas e números malformados.
- Coerência/comparabilidade de protocolos antes das conclusões corporais; não confundir massa muscular esquelética e massa livre de gordura.
- Sem mutação dos registros de entrada, sem consulta ao banco do EvoluFísico2, sem registros clínicos reais nos exemplos.
- Recriação da VM entre execuções para separar caches/identidades. Saídas são potencialmente sensíveis e precisam de proteção no aplicativo consumidor.

## Proveniência e limitações

Fontes dos oito motores derivadas de `dutrafg/Evolufisico2` versão 2.0.1 (23/10/2026). EF77 extraído apenas com equações puras e EF68/EF70 sem inicialização de telas. O software auxilia análise profissional, não constitui diagnóstico nem validação clínica independente.

Consulte `RELATORIO_QA.md`.
