(function () {
    'use strict';

    const mapa_canvas = document.getElementById('map');

    const config = {
        posicaoInicial: {
            latitude: -23.6178375,
            longitude: -46.6483455
        },
        mapa_canvas: mapa_canvas,
        zoom: 10
    }

    const mapa = googleMaps.criarMapa(config);

    googleMaps.obterMarcadores()
        .then(ponto => {
            googleMaps.criarMarcadores(ponto, mapa)
        });

    document.getElementById('btnBuscar').addEventListener('click', function (event) {

        event.preventDefault();
        const filtro = criarFiltro();

        const mapa = googleMaps.criarMapa(config);

        if (filtro == '') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (posicao) {

                    const origem = {
                        latitude: posicao.coords.latitude,
                        longitude: posicao.coords.longitude
                    };
                    
                    rotas.obterMarcadores(origem)
                        .then(ponto => {
                            googleMaps.criarMarcadores(ponto, mapa);
                        });

                }, function () {
                    console.log('Impossível obter a localização');
                });
            } else {
                console.log('O browser não suporta geolocalização');
            }
        } else {
            googleMaps.obterMarcadores(filtro)
                .then(dados => googleMaps.criarMarcadores(dados, mapa));
        }
    });

    const criarFiltro = () => {

        const campo = document.getElementById('txtCidade');

        return campo !== null
            ? campo.value.toLowerCase()
            : '';
    }

})();