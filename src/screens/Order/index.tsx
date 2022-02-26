import React, {
    useState
} from "react";
import { Platform } from "react-native";

import { PIZZA_TYPES } from "../../utils/pizzaTypes";

import {
    Container,
    ContentScroll,
    Header,
    Photo,
    Sizes,
    Form,
    Title, 
    Label,
    InputGroup,
    FormRow,
    Price,
} from './styles';

import { ButtonBack } from "../../components/ButtonBack";
import { RadioButton } from "../../components/RadioButton";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Order(){
    const [size, setSize] = useState('');

    return (
        <Container
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ContentScroll>
                <Header>
                    <ButtonBack 
                        onPress={() => {}}
                        style={{ marginBottom: 108 }}
                    />
                </Header>

                <Photo 
                    source={{ uri: 'http://github.com/paulo-gouvea.png' }}
                />

                <Form>
                    <Title>Nome da Pizza</Title>
                    <Label>Selecione um tamanho</Label>

                    <Sizes>
                        {
                            PIZZA_TYPES.map((item) => {
                                return (
                                    <RadioButton 
                                        key={item.id}
                                        title={item.name}
                                        onPress={() => setSize(item.id)}
                                        selected={size === item.id}
                                    />
                                )
                            })
                        }
                    </Sizes>

                    <FormRow>
                        <InputGroup>
                            <Label>Número da mesa</Label>
                            <Input 
                                keyboardType="numeric"
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input 
                                keyboardType="numeric"
                            />
                        </InputGroup>
                    </FormRow>

                    <Price>Valor de R$00,00</Price>

                    <Button
                        title="COnfirmar Pedido"
                    />
                </Form>
            </ContentScroll>
        </Container>
    )
}