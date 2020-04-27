import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';
import { Translate, getUrlParameter } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { activateAction, reset } from './activate.reducer';

const successAlert = (
  <Alert color="success">
    <Translate contentKey="activate.messages.success">
      <strong>您的账户已经激活，请回到 app 登录</strong>
    </Translate>
  </Alert>
);

const failureAlert = (
  <Alert color="danger">
    <Translate contentKey="activate.messages.error">
      <strong>Your user could not be activated.</strong> Please use the registration form to sign up.
    </Translate>
  </Alert>
);

export interface IActivateProps extends StateProps, DispatchProps, RouteComponentProps<{ key: any }> {}

export const ActivatePage = (props: IActivateProps) => {
  useEffect(() => {
    const key = getUrlParameter('key', props.location.search);
    props.activateAction(key);
    return () => {
      props.reset();
    };
  }, []);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="activate.title">激活成功</Translate>
          </h1>
          {props.activationSuccess ? successAlert : undefined}
          {props.activationFailure ? failureAlert : undefined}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ activate }: IRootState) => ({
  activationSuccess: activate.activationSuccess,
  activationFailure: activate.activationFailure
});

const mapDispatchToProps = { activateAction, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ActivatePage);
