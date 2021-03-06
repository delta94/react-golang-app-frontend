import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {
  Favorite,
  getFavoriteByUser,
  deleteFavorite,
} from "../../ducks/favorite";
import { Product, getProductbyID } from "../../ducks/product";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { Container, Box } from "./styles";
import Header from "../../components/header";
import Footer from "../../components/footer";

interface props extends RouteComponentProps<any> {
  getFavoriteByUser: () => Promise<any>;
  getProductbyID: (productID: string) => Promise<any>;
  deleteFavorite: (favoriteID: string) => Promise<any>;
}

function Favorites(props: props) {
  const [favorites, setFavorites] = useState<Array<Favorite>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setLoading(true);

    props
      .getFavoriteByUser()
      .then((response) => {
        setFavorites(response);

        if (response.length > 0) {
          response.map((value: Favorite) => {
            props
              .getProductbyID(value.ProductID)
              .then((response) => {
                let aux = products.concat([response]);
                setProducts(aux);
              })
              .catch((err) => {});
            return null;
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const deleteFavorite = (index: number) => {
    let aux = favorites[index];

    props
      .deleteFavorite(aux.ID)
      .then((response) => {
        setCount(count + 1);
      })
      .catch((err) => {});
  };

  return (
    <Container>
      <Header {...props} />
      <div className="buffer"></div>
      <h1 className="main-container-h1">favoritos</h1>

      <Box>
        <div className="card-profile">
          {loading ? (
            <LoadingOutlined />
          ) : products.length > 0 ? (
            products.map((value, index) => {
              return (
                <div className="favorite-comp" key={value.ID}>
                  <img src={value.Photos[0]} alt="product" />

                  <div className="data-favorite">
                    <h1>{value.Name}</h1>
                    <div>
                      <p>Quantidade: 1</p>
                      <span>
                        {"R$ " + value.Value.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>

                  <ShoppingCartOutlined
                    onClick={() =>
                      props.history.push({
                        pathname: "/cart",
                        state: {
                          product: value,
                          quantity: 1,
                        },
                      })
                    }
                  />
                  <DeleteOutlined onClick={() => deleteFavorite(index)} />
                </div>
              );
            })
          ) : (
            <span>Sem Produtos Favoritos!</span>
          )}
        </div>
      </Box>
      <Footer />
    </Container>
  );
}

export default connect(null, {
  getFavoriteByUser,
  getProductbyID,
  deleteFavorite,
})(Favorites);
