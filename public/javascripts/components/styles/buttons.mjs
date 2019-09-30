export const pushable = /*css*/ `
  .pushable {
    box-shadow: 2px 2px 3px #bba687;
    transition: all 0.2s;
  }
  
  .pushable:hover {
    background-color: #ffd080;
    transition: all 0.2s;
  }
  
  .pushable:active {
    background-color: #ffd38a;
    transform: translate(2px, 2px);
    box-shadow: none !important;
    transition: all 0.2s;
  }
  `;
export const submitButton = /*css*/ `
  input[type='submit'] {
    border: none;
    background-color: #6d6;
    color: white;
    cursor: pointer;
    font-family: 'Handlee', cursive;
    font-size: 1.3em;
    font-weight: bold;
    margin-top: 25px;
    padding: 10px 20px;
    width: 100%;
  }
  
  input[type='submit']:hover {
    background-color: #4d4;
    color: white;
  }
  `;
