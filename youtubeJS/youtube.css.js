export default () => {
  return `
.afv-settings-button {
  width: 100%;
  padding: 17px;
  box-sizing: border-box;
  display: block;
}

.afv-start-page-top-link {
  text-align: center;
  display: block;
  padding: 15px;
  text-decoration: underline;
}

.afv-start-page-content {
  width: 100%;
  display: block;
  box-sizing: border-box;
}

.afv-start-page-motivation-wrapper {
  margin: 10px;
}

.afv-motivational-item {
  margin-bottom: 25px;
  padding-bottom: 15px;
}

.afv-motivational-item:not(:last-child){
  border-bottom: solid 1px lightgrey;
}

.afv-motivational-item a {

}

.afv-motivational-item img {
  width: 100%;
}

.afv-motivational-item-text{
  font-size: 16px;
}

.afv-motivational-item-author {
  font-size: 12px;
  font-weight: bold;
}

.afv_castIcon {
  fill: #dadada;
  pointer-events: none;
}

#castIconButtonContainer {
  transform: scale(0.8) translateY(2px);
}

/*#castIconButtonContainer {
  z-index: -1;
  position: absolute;
  top: 15px;
  right: 115px;
  width: 20px;
  height: 20px;
}*/
`;
};
