import './Home.css';
import 'tabler-react/dist/Tabler.css';
import { Button, Grid } from 'tabler-react';
import { Helmet } from 'react-helmet';
import { REVIEW } from '../Json-ld';
import Confetti from 'react-dom-confetti';
import DrawForm from '../../components/DrawForm';
import PreviouslyDrawnItemsBlock from '../../components/PreviouslyDrawnItemsBlock';
import React, { Component } from 'react';
import TextLoop from 'react-text-loop';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      drawItems: [],
      currentItems: [],
      pastDrawnItems: [],
      result: '',
      showTextAnimation: true,
      removeDrawnItem: false,
      animationInterval: 150,
      showResult: false,
      disableDrawButton: false,
      value: '',
      placeholder: '',
      valid: false,
      touched: false,
      validationRules: {
        minLength: 3,
        isRequired: true,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSkipAnimationChange = this.handleSkipAnimationChange.bind(this);
    this.handleRemoveDrawnItemChange =
      this.handleRemoveDrawnItemChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.drawItems.length > 2) {
      let formInputItems = this.state.drawItems;
      let itemList = formInputItems.split('\n');
      this.setState({
        ...this.state,
        items: itemList,
        currentItems: itemList,
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.name]: e.value });
  }

  handleSkipAnimationChange = () => {
    this.setState({ showTextAnimation: !this.state.showTextAnimation });
  };

  handleRemoveDrawnItemChange = () => {
    this.setState({ removeDrawnItem: !this.state.removeDrawnItem });
  };

  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  randomDrawItem = () => {
    const { currentItems, showTextAnimation, removeDrawnItem } = this.state;
    this.setState({
      ...this.state,
      showResult: false,
      disableDrawButton: true,
    });

    let maxItemIndex = currentItems.length;
    const randomIndex = Math.floor(Math.random() * maxItemIndex);
    this.sleep(showTextAnimation ? 3000 : 0).then(() => {
      this.setState({
        ...this.state,
        result: currentItems[randomIndex],
        pastDrawnItems: [
          ...this.state.pastDrawnItems,
          currentItems[randomIndex],
        ],
        showResult: true,
        disableDrawButton: false,
      });
    });
    if (removeDrawnItem) {
      const copyCurrentItems = [...this.state.currentItems];
      copyCurrentItems.splice(randomIndex, 1);
      this.setState({
        currentItems: copyCurrentItems,
      });
    }
  };

  render() {
    const {
      items,
      drawItems,
      currentItems,
      result,
      disableDrawButton,
      pastDrawnItems,
      placeholder,
      showResult,
    } = this.state;
    return (
      <div  style={{ padding: 20 }}>
        <div style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <img src="images/logo.svg" style={{ width: 400 }}/>
        </div>
        <Helmet>
          <meta charSet="utf-8" />
          <script type="application/ld+json">{REVIEW}</script>
        </Helmet>
        <Grid.Row>
          <Grid.Col md={12} sm={12}>
            <Carousel>
                <div style={{ marginBottom: 17 }}>
                    <div style={{  backgroundImage: "url(images/diario.jpeg)", margin: '0px auto', height: 300, width: 400, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'  }} />
                    <p className="legend">Diário da Juventude</p>
                </div>
                <div style={{ marginBottom: 32 }}>
                <div style={{  backgroundImage: "url(images/nrh-vol30-2.jpg)", margin: '0px auto', height: 300, width: 400, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'  }} />
                <p className="legend"> NRH vol. 30 part. II</p>  
                </div>
                <div>
                <div />
                    <div style={{  backgroundImage: "url(images/nrh-vol30-1.jfif)", margin: '0px auto', height: 300, width: 400, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'  }} />
                    <p className="legend"> NRH vol. 30 part. I</p>
                </div>
                <div>
                <div />
                  <div style={{  backgroundImage: "url(images/juzu.jpg)", margin: '0px auto', height: 300, width: 400, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'  }} />
                  <p className="legend">Juzu (imagem ilustrativa)</p>
                </div>
                <div>
                <div />
                    <div style={{  backgroundImage: "url(images/pizza.jpeg)", margin: '0px auto', height: 300, width: 400, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} />
                    <p className="legend">Pizza (imagem ilustrativa)</p>
                </div>
            </Carousel>
          </Grid.Col>
        </Grid.Row>
        {items.length !== 0 && (
          <div className="draw-block">
            <Grid.Row>
              <Grid.Col md={12} sm={12}>
                <div className="draw-section">
                  {!showResult && items && (
                    <TextLoop
                      className="draw-text"
                      interval={100}
                      springConfig={{ stiffness: 180, damping: 8 }}
                      children={items}
                    />
                  )}
                  <Confetti active={this.state.showResult} />
                  {showResult && result}
                </div>
                <Button
                  pill
                  block
                  name="drawButton"
                  color="primary"
                  onClick={this.randomDrawItem}
                  disabled={disableDrawButton || currentItems.length <= 1}
                  className="draw-btn"
                >
                  {disableDrawButton ? 'Sorteando...' : 'Sortear'}
                </Button>
              </Grid.Col>
            </Grid.Row>
          </div>
        )}
        {items.length !== 0 && (
           <Grid.Row justifyContent="center">
            <Grid.Col md={4} sm={12}>
              <PreviouslyDrawnItemsBlock pastDrawnItems={pastDrawnItems} />
            </Grid.Col>
           </Grid.Row>
        )}
        <Grid.Row justifyContent="center" style={{ marginTop: 100}}>
          <Grid.Col xs={12} md={8}>
            <DrawForm
              className="draw-form"
              drawItems={drawItems}
              onSubmit={this.handleSubmit}
              handleSkipAnimationChange={this.handleSkipAnimationChange}
              handleRemoveDrawnItemChange={this.handleRemoveDrawnItemChange}
              onChange={this.handleChange}
              placeholder={placeholder}
            />
          </Grid.Col>
        </Grid.Row>
       </div>
    );
  }
}

export default App;
