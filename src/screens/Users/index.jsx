import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Title from '../../components/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Users() {
  const [users, setUsers] = useState([]);

  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiURL}/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(`${apiURL}/users`, {
        name: "Usuário 1",
        email: "dev@camila.com",
        password: "123456",
      });
      console.log(response.data.user);
      getUsers;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUsers()
  }, []);

  console.log("Usuários", users);

  return (
    <View style={styles.container}>
      <Title title={"Users"}/>

      {
        users ? (
          users.map((user) => {
            return(
              <View key={user.id} style={styles.user}>
                <Title title={user.name}/>
                <Title title={user.email}/>
              </View>
            );
          })
        ) : (
          <Title title="Carregando..."/>
        )
      }

      <TouchableOpacity onPress={getUsers} style={styles.button}>
        <Text style={styles.buttonText}>Regarregar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={createUser} style={styles.button}>
        <Text style={styles.buttonText}>Criar usuário</Text>
      </TouchableOpacity>
    </View>
  )
}