import React, {useEffect} from 'react';
import {connect, useSelector} from "react-redux";
import {logout} from "../../redux/actions/auth.action";
import Banner from "../../layouts/components/banners/Banner";
import Container from "react-bootstrap/Container";
import ListProducts from "../../layouts/components/products/ListProducts";
import {managerProductActions} from "../../redux/slices/managerProduct.slice";
import ChatBox from "../../layouts/components/messager/ChatBox";

const Dashboard = ({ productsState, fetchProductsAction }) => {

  useEffect(() => {
    fetchProductsAction()
  }, [])

  const dataProducts = useSelector((state) => state['product'])
  console.log('data products: ', dataProducts)

  if (dataProducts) {
    console.log(dataProducts)
  }

  return <>
    <Container fluid>
      <Banner />
      <hr />
      <h3>Products</h3>
      <hr />
      <ListProducts />
      <ChatBox />
    </Container>
  </>
}

const mapStateToProps = ({ auth, products }) => ({
  userInfoState: auth.userInfo,
  // productsState: products.products
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsAction: payload =>
      dispatch({
        type: `${managerProductActions.fetchProductsPending}_saga`,
        payload,
      }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
