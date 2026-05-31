# Documentação do Pipeline - Kardappio

**Diagrama Visual (Online):** [Acessar fluxograma interativo no Lucidchart](https://lucid.app/lucidchart/a3d71668-62d0-4a85-961b-11a43f90b538/edit?beaconFlowId=A8FBE403E4B8E950&page=0_0&invitationId=inv_a02f660e-cda5-4e14-870f-87f2a77b416a#)

## Visão Geral
Este documento descreve a estrutura que foi construída para extrair pedidos com status confirmado de um banco de dados relacional. O pipeline processa, valida, filtra e transforma esses dados, enviando no final para uma API REST externa. O fluxo foi estruturado de forma compatível com plataformas de integração visual como N8N ou SmartConnector, facilitando futuras automações e expansões.


## Tecnologias Utilizadas

- React
- React Router DOM
- JavaScript
- SQL
- REST API
- Custom Hooks
- Service Layer
- Vite


## Detalhamento das Etapas

### Etapa 1: Entrada (Extração via SQL)
Tipo: Database Query
Objetivo: Buscar todos os pedidos confirmados e cruzar as informações essenciais através de relacionamentos (INNER JOIN) com as tabelas de clientes, produtos e itens do pedido.

Query SQL Utilizada:
```sql
SELECT 
    p.id AS pedido_id,
    c.id AS cliente_id,
    c.email AS email_cliente,
    p.subtotal,
    p.imposto,
    p.total AS valor_total,
    p.data_entrega,
    ip.produto_id,
    pr.nome AS nome_produto,
    pr.sku,
    ip.quantidade,
    ip.observacao
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id
INNER JOIN itens_pedido ip ON p.id = ip.pedido_id
INNER JOIN produtos pr ON ip.produto_id = pr.id
WHERE p.status = 'confirmado';
```


### Etapa 2: Filtro de Dados
Tipo: Filter Node
Objetivo: Garantir a integridade básica dos dados antes do processamento.
* Remove pedidos que vieram sem itens associados (linhas órfãs).
* Remove itens onde a quantidade seja menor ou igual a zero.


### Etapa 3: Enriquecimento de Dados
Tipo: API Request / Enrichment Node
Objetivo: Adicionar dados externos necessários para a verificação do pedido. A etapa faz uma consulta paralela à API `GET /estoque/{produto_id}` para buscar as informações atualizadas de inventário de cada item.

### Etapa 4: Validação de Regra de Negócio (Decisão)
Tipo: Validation / Switch Node
Objetivo: Tomar uma decisão baseada nos dados enriquecidos na Etapa 3. O nó verifica se o estoque disponível atende à quantidade do pedido.
* Caminho "Sim" (Estoque OK): O pedido é válido e o fluxo avança para a próxima etapa.
* Caminho "Não" (Sem Estoque): O pedido é barrado e direcionado a um nó de Log de Erro, finalizando o processo para este pedido.

### Etapa 5: Transformação (Mapeamento de Dados)
Tipo: Transform / Mapper Node
Objetivo: Converter o formato tabular retornado pela query SQL para a estrutura JSON exigida pela API REST. A etapa agrupa os itens e dados financeiros (subtotal, imposto) dentro do array correspondente ao pedido_id.

### Etapa 6: Saída (Envio para API)
Tipo: HTTP Request Node
Objetivo: Realizar a requisição POST /pedidos enviando o payload preparado.

### Etapa 7: Atualização de Estado (Update SQL)
Tipo: Database Update Node
Objetivo: Após receber a confirmação de sucesso (Status 201) da API externa, o fluxo executa um comando no banco de dados local para alterar o status do pedido de 'confirmado' para 'enviado'. Esse passo é essencial para garantir que o pipeline não extraia o mesmo pedido de novo nas próximas rodadas, prevenindo envio duplicado.


## Exemplos de Transformação de Dados

### Dados de Entrada (Saída da Etapa 1 - SQL)
Como os dados chegam do banco relacional:

```json
[
  {
    "pedido_id": 5001,
    "cliente_id": 123,
    "email_cliente": "cliente@email.com",
    "subtotal": 60.00,
    "imposto": 8.79,
    "valor_total": 68.79,
    "data_entrega": "2024-01-25",
    "produto_id": 1,
    "nome_produto": "Produto A",
    "sku": "SKU-001",
    "quantidade": 2,
    "observacao": "Ao Ponto"
  }
]
```


### Dados de Saída (Payload final enviado pela Etapa 6)
O formato final recebido pela API:

```json
{
  "cliente_id": 123,
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 2,
      "observacao": "Ao Ponto"
    }
  ],
  "data_entrega": "2024-01-25"
}
```


## Tratamento de Erros e Logs

Para garantir a resiliência, a estrutura tem tratamentos específicos para cenários de falha:

* Dados Incompletos: Se um pedido não tiver cliente válido ou a validação do CEP falhar, a etapa descarta o pedido e salva no log de exceptions.
* Falha de Validação: Pedidos que excedem o limite de itens ou não têm estoque ficam pendentes para revisão manual.
* Erros de API (Timeouts ou 500): O processo foi estruturado para suportar controles de estado e prevenção de duplicidade em cenários de instabilidade de rede.
