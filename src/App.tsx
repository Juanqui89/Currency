/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

export const App = () => {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("USD");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<number | null>(null);

  // const handleSelectFromChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCurrencyFrom(e.target.value);
  // };

  // const handleSelectToChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCurrencyTo(e.target.value);
  // };

  // const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAmount(e.target.value);
  // };

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://currencyconverter.p.rapidapi.com/availablecurrencies",
          headers: {
            "X-RapidAPI-Key":
              "ccf82274a9msh3bbdb7d48cd9508p12bd09jsn30756a2f7107",
            "X-RapidAPI-Host": "currencyconverter.p.rapidapi.com",
          },
        });

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrency();
  }, []);

  const handleSubmit = async () => {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/" + selectedCurrencyFrom
    );

    const conversionRate = response.data.rates[selectedCurrencyTo];

    const calculatedResult = Number(amount) * Number(conversionRate);

    setResult(calculatedResult);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Currency Conversion</h1>
            <Form onSubmit={handleSubmit} className="content">
              <Form.Group controlId="selectCurrencyFrom">
                <Form.Label>Select Currency:</Form.Label>
                <Form.Select
                  value={selectedCurrencyFrom}
                  onChange={(e) => setSelectedCurrencyFrom(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="MXN">MXN</option>
                  <option value="EUR">EUR</option>
                  <option value="RUB">RUB</option>
                  <option value="ARS">ARS</option>
                  <option value="DOP">DOP</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="selectCurrencyTo">
                <Form.Label>Convert To:</Form.Label>
                <Form.Select
                  value={selectedCurrencyTo}
                  onChange={(e) => setSelectedCurrencyTo(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="MXN">MXN</option>
                  <option value="EUR">EUR</option>
                  <option value="RUB">RUB</option>
                  <option value="ARS">ARS</option>
                  <option value="DOP">DOP</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="amount">
                <Form.Label>Amount:</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>

              <Button onClick={handleSubmit} type="button" className="btn">
                Convert
              </Button>
            </Form>
            {result && (
              <p className="result">
                Result: {result.toFixed(2)} {selectedCurrencyTo}
              </p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
