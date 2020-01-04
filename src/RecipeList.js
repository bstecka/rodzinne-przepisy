import React from 'react';
import { List, Card, Tag} from 'antd';
import './RecipeList.css';
import { defaultImageURL } from './consts';
import { useHistory } from "react-router-dom";

export default function RecipeList({handleClick, recipes, columns}) {

    let history = useHistory();

    const onTagClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      history.push('/szukaj/'+ e.target.innerText);
    }

    const onClick = (id) => {
      handleClick('/przepis/' + id);
    }

    return (
      <List
          grid={{gutter: 12, column: columns}} 
          dataSource={recipes} 
          renderItem={item => 
            <List.Item onClick={() => onClick(item.id)}>
              <Card className="card" hoverable cover={<img alt="example" src={item.thumbnailUrl.length > 1 ? item.thumbnailUrl : defaultImageURL} className="card-image" />}>
                <p className="recipe-title">{item.title}</p>
                {item.tags.map((tag, id) => <Tag onClick={onTagClick} key={id}>{tag}</Tag>)}
                </Card>
            </List.Item>} 
      />
    );
  }

