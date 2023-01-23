import { matutu } from "../class.js";


$(document).ready(() => {
    
    $('#next-div-one').on('click', () => {
        $('#card-one').css('visibility', 'hidden');
        $('#card-two').css('visibility', 'visible');
    });

})