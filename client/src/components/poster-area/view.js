import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid, Image, Card} from 'semantic-ui-react';

import DateHelper from '../../helpers/date';

class View extends Component {
  render() {
    const {media, typeMedia, maxDisplay, mediaPerColumn} = this.props;
    let cards = [];
    const content = [];

    for (let i=0; i < maxDisplay; i++) {
      const link = `/${typeMedia}/${media[i].id}`;
      cards.push(
        <Grid.Column key={cards.length}>
          <Link to={link}>
            <Card >
              <Image src={media[i].attributes.posterLink} />
              <Card.Content>
                <Card.Header>{media[i].attributes.name}</Card.Header>
                <Card.Meta>
                  Added on:
                  <div>
                    <DateHelper date={media[i].attributes.addedAt}/>
                  </div>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Link>
        </Grid.Column>
      );
      if (cards.length % mediaPerColumn === 0) {
        content.push(
          <Grid.Row columns={mediaPerColumn} key={content.length}>
            {cards}
          </Grid.Row>
        );
        cards = [];
      }
    }

    if (cards) {
      content.push(
        <Grid.Row columns={mediaPerColumn} key={content.length}>
          {cards}
        </Grid.Row>
      );
    }

    return (
      <Grid>
        {content}
      </Grid>
    );
  }
}
export default View;