# Documentação do Pipeline - Kardappio

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


## Diagrama Visual
O desenho arquitetural da estrutura pode ser acessado pelo link abaixo:

> [Link será inserido na conclusão]


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
    ip.quantidade
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

### Etapa 3: Validação de Regras de Negócio
Tipo: Validation / Logic Node
Objetivo: Aplicar as regras de negócio do sistema.
* Limite de Itens: Verifica se o somatório das quantidades do pedido excede o limite máximo (ex: 10 itens). Se exceder, a etapa direciona o registro para falha.

### Etapa 4: Enriquecimento de Dados
Tipo: API Request / Enrichment Node
Objetivo: Adicionar dados externos necessários para a finalização do pedido.
* Validação de CEP/Área de Entrega: Conexão com a API do IBGE (ou serviços de geolocalização) utilizando os dados de endereço do cliente para validar se a região possui cobertura de entrega ativa.
* Consulta de Estoque: Consulta paralela à API GET /estoque/{produto_id} para garantir a disponibilidade.

### Etapa 5: Transformação (Mapeamento de Dados)
Tipo: Transform / Mapper Node
Objetivo: Converter o formato tabular retornado pela query SQL para a estrutura JSON exigida pela API REST. A etapa agrupa os itens e dados financeiros (subtotal, imposto) dentro do array correspondente ao pedido_id.

### Etapa 6: Saída (Envio para API)
Tipo: HTTP Request Node
Objetivo: Realizar a requisição POST /pedidos enviando o payload preparado.


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
    "quantidade": 2
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
      "quantidade": 2
    }
  ],
  "data_entrega": "2024-01-25"
}
```


## Tratamento de Erros e Logs

Para garantir a resiliência, a estrutura tem tratamentos específicos para cenários de falha:

* Dados Incompletos: Se um pedido não tiver cliente válido ou a validação do IBGE falhar, a etapa descarta o pedido e salva no log de exceptions.
* Falha de Validação: Pedidos que excedem o limite de itens ou não têm estoque ficam pendentes para revisão manual.
* Erros de API (Timeouts ou 500): O processo foi estruturado para suportar controles de estado e prevenção de duplicidade em cenários de instabilidade de rede.
