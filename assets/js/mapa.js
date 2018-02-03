const googleMaps = (function (config) {
    'use strict';

    return {

        criarMapa: (config) => {

            return new google.maps.Map(config.mapa_canvas, {
                zoom: config.zoom,
                center: {
                    lat: config.posicaoInicial.latitude,
                    lng: config.posicaoInicial.longitude
                }
            });
        },

        criarMarcadores: (dados, mapa) => {

            dados.forEach(pos => {
                const marcador = new google.maps.Marker({
                    position: {
                        lat: pos.latitude,
                        lng: pos.longitude
                    },
                    map: mapa
                });

                const rotulo = `<b>Local:</b> ${pos.local} <br /> 
                            <b>Logradouro:</b> ${pos.logradouro} <br /> 
                            <b>Telefone:</b> ${pos.telefone}`;

                const infowindow = new google.maps.InfoWindow({
                    content: rotulo
                });

                marcador.addListener('click', function () {
                    infowindow.open(mapa, marcador);
                });
            });
        },

        obterMarcadores: function (filtro) {

            return fetch('assets/dados/pontos.json')
                .then(dados => dados.json())
                .catch(erro => {
                    console.log('impossível obter marcadores' + erro);
                });
        }
    }

})();
