import { connect, useDispatch } from "react-redux";
import {
  DecreseCount,
  IncreaseCount,
  fetchDataFailure,
  fetchDataSuccess,
} from "../../redux/product/productAction";
import { setIsFiltersChanged } from "../../redux/filter/filterAction";
import styles from "./index.module.css";
import {
  addToCart,
  increaseCartQuantity,
  RemoveCart,
} from "../../redux/cart/cartAction";
import Filter from "../../components/filter/filter";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import { listProductsApi, listShopsApi } from "../../services/api/products";
import withLayout from "../../components/Layout";
import { useCallback, useEffect, useState } from "react";
import LazyScroll from "../../components/LazyScroll";
import { useMutation } from "../../services/queries/useMutation";
import { useQuery } from "../../services/queries/useQuery";
import { PiSliders } from "react-icons/pi";

const Product = ({
  product,
  handleDecreaseCount,
  handleUpdateCount,
  handleAddToCart,
}) => {
  let { _id: id, quantity, price, image, name, description } = product || {};
  return (
    <Col md={6} xs={12} lg={4} className="mb-5" key={id}>
      <div className={styles?.product}>
        <div className={styles?.image}>
          <img src={"https://api.vtbazaar.net/" + image} alt="product" />
        </div>
        <div className={styles?.content}>
          <h5>{name}</h5>
          <p>{description} </p>
          <p className={styles?.price}>{"₹" + price + ".00"} </p>
        </div>
        <div className={styles?.cart}>
          {quantity !== 0 ? (
            <>
              <button
                type="button"
                className={styles.cartButton}
                onClick={() => handleDecreaseCount({ id, quantity, price })}
              >
                -
              </button>
              <span className="count  ml-1 mr-1">{quantity}</span>
              <button
                type="button"
                className={styles.cartButton}
                onClick={() => handleUpdateCount(product, quantity)}
              >
                +
              </button>
            </>
          ) : (
            <button
              className={styles?.cartIcon}
              onClick={() => handleAddToCart(product)}
            >
              <FaCartShopping />
            </button>
          )}
        </div>
      </div>
    </Col>
  );
};

function Products({
  filters,
  increaseProductCount,
  decreaseProductCount,
  addToCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  isFilterChanged,
  products,
}) {
  const [isSideBarShown, setIsSideBarShown] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const { _id, quantity, price } = product;
    increaseProductCount(_id, quantity, price);
    addToCart(product, price);
  };
  const handleUpdateCount = (product, quantity) => {
    increaseProductCount(product._id, quantity);
    increaseCartQuantity(product._id, quantity, product.price);
    addToCart(product);
  };
  const handleDecreaseCount = ({ id, quantity, price }) => {
    decreaseCartQuantity(id, quantity, price);
    decreaseProductCount(id, quantity);
  };

  const { isMutating, mutate } = useMutation(listProductsApi, {
    onSuccess: ({ data }) => {
      dispatch(fetchDataSuccess(data?.products));
      dispatch(setIsFiltersChanged());
      // const productsAddedToCart = data?.products?.filter(
      //   (product) => product?.quantity > 0
      // );
      // productsAddedToCart?.map((product) => addToCart(product, product.price));
    },
    onError: (error) => {
      dispatch(fetchDataFailure(error?.message));
      dispatch(setIsFiltersChanged());
    },
  });

  const { data: listshopsQuery } = useQuery(listShopsApi);

  const handleScroll = useCallback(() => {
    mutate({ ...filters, page: filters?.page + 1 });
  }, [mutate, filters]);

  useEffect(() => {
    if (isFilterChanged) {
      mutate(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterChanged]);

  return isMutating ? (
    <h2>Loading...</h2>
  ) : (
    <Container fluid className="pl-5 pr-5">
      <Row>
        <Filter
          shops={listshopsQuery?.shop}
          onClose={() => setIsSideBarShown(false)}
          isSideBarShown={isSideBarShown}
        />

        {products?.length > 0 ? (
          <LazyScroll onWindowScrollReachEnd={handleScroll}>
            <Col xs={12} md={9} className="pt-1">
              <Row>
                <Col xs={12} className={styles.filterContainer}>
                  <h5 className={styles.header}>#TREND NOW</h5>

                  <Button
                    variant="secondary"
                    className={styles.filterIcon}
                    onClick={() => setIsSideBarShown(true)}
                  >
                    <PiSliders style={{ fontSize: "1.5rem" }} />
                  </Button>
                </Col>
              </Row>

              <Row>
                {products?.map((product) => {
                  return (
                    <Product
                      key={product.id}
                      product={product}
                      handleAddToCart={handleAddToCart}
                      handleUpdateCount={handleUpdateCount}
                      handleDecreaseCount={handleDecreaseCount}
                    />
                  );
                })}
              </Row>
            </Col>
          </LazyScroll>
        ) : (
          <Col xs={9} className="pt-5">
            <p className="mt-5 text-center">
              There are no products listed under this category.
            </p>
          </Col>
        )}
      </Row>
      {isSideBarShown && <div className={styles.sideBarBackground}></div>}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    filters: state.filter.filters,
    isFilterChanged: state.filter.isFilterChanged,
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseProductCount: (id, quantity) =>
      dispatch(IncreaseCount(id, quantity)),
    decreaseProductCount: (id, quantity) =>
      dispatch(DecreseCount(id, quantity)),
    addToCart: (item, price) => dispatch(addToCart(item, price)),
    increaseCartQuantity: (id, quantity, price) =>
      dispatch(increaseCartQuantity(id, quantity, price)),
    decreaseCartQuantity: (id, quantity, price) =>
      dispatch(RemoveCart(id, quantity, price)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLayout(Products));
