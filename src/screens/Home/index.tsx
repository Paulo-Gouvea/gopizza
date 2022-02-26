import React, {
    useState, 
    useCallback,
} from "react";
import { Alert, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import happyEmoji from '../../assets/happy.png';

import { 
    Container,
    Header, 
    Greeting,
    GreetingEmoji,
    GreetingText,
    Title,
    MenuHeader,
    MenuItemsNumber,
    NewProductButton,
} from "./styles";

import { useTheme } from "styled-components/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Search } from "../../components/Search";
import { ProductCard, ProductProps } from "../../components/ProductCard";

export function Home(){
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');

    const { COLORS } = useTheme();
    const { navigate } = useNavigation();

    function fetchPizzas(value: string){
        const formattedValue = value.toLocaleLowerCase().trim();

        firestore()
        .collection('pizzas')
        .orderBy('name_insensitive')
        .startAt(formattedValue)
        .endAt(`${formattedValue}\uf8ff`)
        .get()
        .then((response) => {
            const data = response.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            }) as ProductProps[];

            setPizzas(data);
        })
        .catch((error) => {
            Alert.alert('Consulta', 'Não foi possível realizar a consulta');
            console.log(error);
        })
    }

    function handleSearch(){
        fetchPizzas(search);
    }

    function handleSearchClear(){
        setSearch('');
        fetchPizzas('');
    }

    function handleOpen(id: string){
        navigate('product', { id });
    }

    function handleAdd(){
        navigate('product', {});
    }

    useFocusEffect(
        useCallback(()=> {
            fetchPizzas('');
        }, [])
    );

    return(
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji
                        source={happyEmoji}
                    />
                    <GreetingText>Olá, Admin</GreetingText>
                </Greeting>

                <TouchableOpacity>
                    <MaterialIcons
                        name='logout'
                        color={COLORS.TITLE}
                        size={24}
                    />
                </TouchableOpacity>

            </Header>

            <Search
                onChangeText={setSearch}
                value={search}
                onSearch={handleSearch}
                onClear={handleSearchClear}
            />

            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
            </MenuHeader>

            <FlatList 
                data={pizzas}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24
                }}
                renderItem={({ item }) => (
                    <ProductCard 
                        data={item}
                        onPress={() => handleOpen(item.id)}
                    />
                )}
            />

            <NewProductButton 
                title="Cadastrar Pizza"
                type="secondary"
                onPress={handleAdd}
            />
        </Container>
    );
}