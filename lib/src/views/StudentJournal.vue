<template>
    <v-container class="mt-2">
        <v-card 
            class="mx-auto"
            max-width="350"
            max-height="120"
        >
            <v-card-text class="d-flex align-center flex-column pa-0">
                <h3 class="ma-0 mt-1 font-weight-black">Week</h3>
                <h3 class="ma-0 font-weight-black">namn namnsson</h3>
            </v-card-text>
            <v-container class="d-flex justify-center">
                <v-icon size="35">mdi-chevron-left</v-icon>
                <p class="ma-0 mt-1">Veckodag</p>
                <v-icon size="35">mdi-chevron-right</v-icon>
            </v-container>
        </v-card>

        <v-card class="mx-auto mt-10 flex-column" max-width="1500">
            <v-container >
                <p>Vad har du gjort under dagen?</p>
                <v-text-field flat solo placeholder="Answer here"></v-text-field>

            </v-container>
            <v-divider></v-divider>
            <v-container>
                <p>Vad har du lärt dig?</p>
                <v-text-field flat solo placeholder="Answer here"></v-text-field>
            </v-container>
            <v-divider></v-divider>
            <v-container>
                <p>Vad förstod du inte / Vilka frågor har du inte fått svar på?</p>
                <v-text-field flat solo placeholder="Answer here"></v-text-field>
            </v-container>
            <v-divider></v-divider>
            <v-container>
                <p>Vad vill du lära dig mer om?</p>
                <v-text-field flat solo placeholder="Answer here"></v-text-field>
            </v-container>
            <v-divider></v-divider>
            <p class="ml-2">Comments</p>
            <Timeline
                :comments="[{'body': 'hej', 'author': 'läraren'}]"
            />
            <v-col cols="12">
                <v-textarea
                    filled
                    color="teal"
                >
                    <template v-slot:label>   
                        <div>
                            Comment
                        </div>
                    </template>
                </v-textarea>
            </v-col>
            <div class="d-flex justify-end">
                <v-btn
                    class="ma-2"
                    :loading="loading2"
                    :disabled="loading2"
                    color="success"
                    @click="loader = 'loading2'"
                    
                >
                Send Comment
                <template v-slot:loader>
                    <span>Loading...</span>
                </template>
                </v-btn>
                </div>

        </v-card>
    </v-container>

</template>

<script lang="ts">
import  Timeline  from '@/components/Timeline.vue' 
export default {
    name: "Journal",
    components: {Timeline}
}

</script>
