import React from "react";
import { List, Card, Avatar } from 'antd';

export default function SaleList({handleSalesClick, sales}) {

  const onClick = (id) => {
    handleSalesClick('/promocja/' + id + '?_sort=stores,price&_order=asc');
  }

  return (
  <List 
    grid={{gutter: 12, column: 1}} 
    dataSource={sales && sales.slice(0,3)}
    renderItem={item => 
        <List.Item onClick={() => onClick(item.id)}>
            <Card hoverable cover={<img alt="sales_example" src={item.product_url} />}>{item.product_name}
                <List itemLayout="horizontal" dataSource={item.stores && item.stores.slice(0,3).sort((a, b) => a.price - b.price)} size="large" renderItem={item => <List.Item>
                      <List.Item.Meta width={150} avatar={<Avatar src={item.logo_url} shape="square" />} title={item.name} />
                      <div>{item.price} zł</div>
                    </List.Item>} />
            </Card>
        </List.Item>} />
  );
}
