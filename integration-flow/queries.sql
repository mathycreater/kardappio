-- Query para extração de pedidos confirmados e cruzamento de dados para integração (Pipeline N8N/SmartConnector)

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
INNER JOIN clientes c 
    ON p.cliente_id = c.id
INNER JOIN itens_pedido ip 
    ON p.id = ip.pedido_id
INNER JOIN produtos pr 
    ON ip.produto_id = pr.id
WHERE p.status = 'confirmado';
