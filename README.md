# Desafio Técnico - Kardappio (Full Stack)

Este repositório contém a solução desenvolvida para a avaliação técnica. O projeto está dividido em duas partes: Desenvolvimento Frontend e Arquitetura de Integração.

## Como Executar o Projeto

Para rodar a aplicação na sua máquina, basta usar os comandos abaixo:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
npm run dev
```

## Decisões Técnicas e Prevenções (Frontend)

Durante o desenvolvimento da aplicação (Tarefa 1), algumas decisões arquiteturais e preventivas foram adotadas para melhorar a manutenção, escalabilidade, performance e a estabilidade.

### Gerenciamento Local de Imagens
As imagens do catálogo foram baixadas e armazenadas localmente no projeto ao invés de utilizar hotlinks externos. 

Objetivos:
* evitar indisponibilidade caso URLs externas parem de funcionar;
* reduzir dependência de terceiros;
* melhorar a estabilidade visual da aplicação.

Além disso, as imagens foram comprimidas utilizando ferramentas como TinyJPG para otimizar o tempo de carregamento e a experiência mobile.

### Estrutura Preparada para Personalização
A modelagem dos produtos foi pensada para futura expansão de adicionais, observações, personalizações, ponto da carne e ingredientes opcionais. Cada produto pode possuir sua própria estrutura de configuração, evitando conflitos entre os dados.

### Organização Modular e Isolamento de Estilos
Os componentes foram reorganizados em estrutura modular (ex: components/Cart, components/Hero, etc). 
Os arquivos CSS também foram organizados por componente, reduzindo risco de conflitos globais de estilo. 
Benefícios: menor risco de colisão de classes e maior previsibilidade visual.

### Utilização de Custom Hooks e Service Layer
Hooks customizados (useCart, useApi) foram criados para separar a lógica da camada de renderização.
A comunicação assíncrona foi separada em uma camada de serviços (services/api.js).
Isso ajuda a desacoplar o frontend da origem dos dados e facilita futuras integrações com um backend real.

### Preparação para Integrações Futuras
O projeto foi planejado considerando possíveis integrações:
* APIs de estoque e CEP/IBGE;
* cálculo de frete;
* autenticação;
* gateways de pagamento.


## Tarefa 2: Pipeline de Integração

A documentação da pipeline, diagramas e banco de dados pode ser encontrada nos arquivos abaixo:

* [Documentação do Pipeline](./integration-flow/flow-documentation.md)
* [Queries SQL Utilizadas](./integration-flow/queries.sql)
* [Esquema do Banco de Dados](./database-schema.md)
* [Documentação da API](./api-documentation.md)
