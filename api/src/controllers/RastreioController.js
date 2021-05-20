import { rastrearEncomendas  } from "correios-brasil";

class RastreioController {
  async show(req, res) {
      rastrearEncomendas([req.params.codigo])
      .then((response) => {
        res.status(200).send({ response });
      })
      .catch((error) => {
        res.status(401).send({ error });
      });
  }
}

module.exports = new RastreioController();
