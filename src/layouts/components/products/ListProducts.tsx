import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import {Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import {isEmpty} from "lodash";

const ListProducts = ({ dataProducts }) => {

    return (
        <>
            <Row>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image
                                src={'https://s.alicdn.com/@sc04/kf/Hb9a8f03368444557b739a68576cf08a7y.jpg_300x300.jpg'}
                                fluid
                                rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image src={'https://i.pinimg.com/236x/09/57/f3/0957f3ef4341454ec9f9924c0f22c6eb.jpg'}
                                   fluid
                                   rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image
                                src={'https://s.alicdn.com/@sc04/kf/Hb9a8f03368444557b739a68576cf08a7y.jpg_300x300.jpg'}
                                fluid
                                rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image src={'https://i.pinimg.com/236x/09/57/f3/0957f3ef4341454ec9f9924c0f22c6eb.jpg'}
                                   fluid
                                   rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image
                                src={'https://s.alicdn.com/@sc04/kf/Hb9a8f03368444557b739a68576cf08a7y.jpg_300x300.jpg'}
                                fluid
                                rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image src={'https://i.pinimg.com/236x/09/57/f3/0957f3ef4341454ec9f9924c0f22c6eb.jpg'}
                                   fluid
                                   rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image
                                src={'https://s.alicdn.com/@sc04/kf/Hb9a8f03368444557b739a68576cf08a7y.jpg_300x300.jpg'}
                                fluid
                                rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image src={'https://i.pinimg.com/236x/09/57/f3/0957f3ef4341454ec9f9924c0f22c6eb.jpg'}
                                   fluid
                                   rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image
                                src={'https://s.alicdn.com/@sc04/kf/Hb9a8f03368444557b739a68576cf08a7y.jpg_300x300.jpg'}
                                fluid
                                rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
                <Col md={2} sm={4} className={'mb-2'}>
                    <div className={'product-item'}>
                        <div className={'mb-2'}>
                            <Image src={'https://i.pinimg.com/236x/09/57/f3/0957f3ef4341454ec9f9924c0f22c6eb.jpg'}
                                   fluid
                                   rounded
                            />
                        </div>
                        <div className={'mb-2'}>
                            <h5>X-mas decor</h5>
                        </div>
                        <div className={'mb-2'}>
                            <p>
                                Deception about this in here. You can buy it for yourself or someone you care about!
                            </p>
                        </div>
                        <div className={'mb-2 d-flex justify-content-center'}>
                            <Button variant="danger">Buy it</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ListProducts;