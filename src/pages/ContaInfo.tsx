import { Box, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../components/AppContext"
import { api } from "../api"

interface UserData {
    email: string
    password: string
    name: string
    id: string
}

const ContaInfo = () => { 

    const [ userData, setUserData ] = useState<null | UserData>()
    const { id } = useParams()
    
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AppContext)
    
    !isLoggedIn && navigate('/')

    useEffect(() => {
        const getData = async () => {
            const data: any | UserData = await api
            setUserData(data)
        }

        getData()
    }, [])

    if(userData && id !== userData.id) {
        navigate('/')
    }
    

    return (
        <>
            <Box marginTop={'10rem'} h={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box bg={'#fff'} borderRadius={'10px'} w={"max-content"} padding={'10px'}>
            <Text fontSize='3xl' fontWeight='bold'>
                Informações da conta
            </Text>
            
            <Box>
                <Text>
                    Nome:
                    <br/>
                    Email:
                    <br/>
                </Text>
            </Box>

            <Box fontWeight={'lighter'} textAlign={'center'} bg={'orange'} textColor={'black'} borderRadius={'5px'}>
            <Link to='/conta/1'>
                <Text fontSize='xl'>
                    Voltar para a Conta
                </Text>
            </Link>
            </Box>
            </Box>
            </Box>
        </>
    )
}

export default ContaInfo
