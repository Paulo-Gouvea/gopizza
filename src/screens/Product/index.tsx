import React, {
    useState,
} from "react";
import { 
    Platform,
    TouchableOpacity, 
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from "expo-image-picker";

import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton,
} from './styles';

import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from "../../components/Photo";
import { InputPrice } from "../../components/InputPrice";

export function Product(){
    const [image, setImage] = useState(null);

    async function handlePickerImage(){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status === 'granted'){
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });

            if(!result.cancelled){
                const { uri } = result as ImageInfo;
                setImage(uri);
            }
        }
    }

    return(
        <Container
            behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
        >
            <Header>
                <ButtonBack />

                <Title>Cadastrar</Title>

                <TouchableOpacity>
                    <DeleteLabel>Deletar</DeleteLabel>
                </TouchableOpacity>
            </Header>

            <Upload>
                <Photo uri={image} />

                <PickImageButton 
                    title='Carregar'
                    type='secondary'
                    onPress={handlePickerImage}
                />
            </Upload>

            <InputPrice size="P" />
            <InputPrice size="M" />
            <InputPrice size="G" />

        </Container>
    );
}