const rotas = (function () {
  'use strict';

  const obterDistancia = (origem, destino) => {

    const origemLatitude = parseFloat(origem.latitude) * Math.PI / 180.0;
    const origemLongitude = parseFloat(origem.longitude) * Math.PI / 180.0;
    const destinoLatitude = parseFloat(destino.latitude) * Math.PI / 180.0;
    const destinoLongitude = parseFloat(destino.longitude) * Math.PI / 180.0;

    const diferencaLatitude = destinoLatitude - origemLatitude;
    const diferencaLongitude = destinoLongitude - origemLongitude;

    const a =
      Math.sin(diferencaLatitude / 2) * Math.sin(diferencaLatitude / 2) +
      Math.cos(origem.latitude) * Math.cos(destino.latitude) *
      Math.sin(diferencaLongitude / 2) * Math.sin(diferencaLongitude / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(6371.0 * c * 1000);

  }

  return {

    obterMarcadores: (origem) => {

      return new Promise((resolve, reject) => {

        googleMaps.obterMarcadores()
          .then(dados => {

            let destinos = [];

            dados.forEach(destino => {

              const distancia = obterDistancia(origem, destino);

              destinos.push({
                local: destino.local,
                logradouro: destino.logradouro,
                tipos: destino.tipos,
                distancia: distancia,
                latitude: destino.latitude,
                longitude: destino.longitude
              })

            });

            destinos.sort((a, b) => {
              return a.distancia - b.distancia;
            });

            destinos = destinos.slice(0, 5);

            resolve(destinos);

          })
          .catch(erro => {
            reject('impossível obter marcadores' + ' erro: ' + erro);
          });
      });
    }
  }
})();
