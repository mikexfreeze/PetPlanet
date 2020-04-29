import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IImage } from 'app/shared/model/image.model';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPostUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PostUpdate = (props: IPostUpdateProps) => {
  const [idstag, setIdstag] = useState([]);
  const [authorId, setAuthorId] = useState('0');
  const [imageId, setImageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { postEntity, users, images, tags, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/post' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getImages();
    props.getTags();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...postEntity,
        ...values,
        tags: mapIdList(values.tags)
      };
      entity.user = users[values.user];

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="petPlanetApp.post.home.createOrEditLabel">
            <Translate contentKey="petPlanetApp.post.home.createOrEditLabel">Create or edit a Post</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : postEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="post-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="post-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="post-title">
                  <Translate contentKey="petPlanetApp.post.title">Title</Translate>
                </Label>
                <AvField id="post-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="post-content">
                  <Translate contentKey="petPlanetApp.post.content">Content</Translate>
                </Label>
                <AvField
                  id="post-content"
                  type="text"
                  name="content"
                  validate={{
                    maxLength: { value: 2048, errorMessage: translate('entity.validation.maxlength', { max: 2048 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdLabel" for="post-created">
                  <Translate contentKey="petPlanetApp.post.created">Created</Translate>
                </Label>
                <AvField id="post-created" type="date" className="form-control" name="created" />
              </AvGroup>
              <AvGroup>
                <Label for="post-author">
                  <Translate contentKey="petPlanetApp.post.author">Author</Translate>
                </Label>
                <AvInput id="post-author" type="select" className="form-control" name="author.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="post-image">
                  <Translate contentKey="petPlanetApp.post.image">Image</Translate>
                </Label>
                <AvInput id="post-image" type="select" className="form-control" name="image.id">
                  <option value="" key="0" />
                  {images
                    ? images.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.image}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="post-tag">
                  <Translate contentKey="petPlanetApp.post.tag">Tag</Translate>
                </Label>
                <AvInput
                  id="post-tag"
                  type="select"
                  multiple
                  className="form-control"
                  name="tags"
                  value={postEntity.tags && postEntity.tags.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {tags
                    ? tags.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.tag}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/post" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  images: storeState.image.entities,
  tags: storeState.tag.entities,
  postEntity: storeState.post.entity,
  loading: storeState.post.loading,
  updating: storeState.post.updating,
  updateSuccess: storeState.post.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getImages,
  getTags,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostUpdate);
