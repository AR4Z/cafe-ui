<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-card-title>
            <span class="title">Ingrese la información de los lotes</span>
          </v-card-title>
          <v-container>
            <v-form>
              <div v-for="lote in lotes" :key="lote.num">
                <v-layout :column="$vuetify.breakpoint.mdAndDown" :row="!$vuetify.breakpoint.mdAndDown">
                  <v-flex xs12 md4>
                    <v-text-field label="Cafe maduro promedio" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-radio-group label="Pendiente de inclinación">
                      <v-radio label="mayor al 200%" :value="3"></v-radio>
                      <v-radio label="101% - 200%" :value="2"></v-radio>
                      <v-radio label="20% - 100%" :value="1"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex x1 class="pt-3">
                    <v-btn
                      v-if="lote.num == 0"
                      color="warning"
                      v-on:click.native="addLote"
                    >Añadir lote  <v-icon dark right>add</v-icon></v-btn>
                    <v-btn v-else color="error" v-on:click.native="() => removeLote(lote.num)">
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "StaffCalculate",
  data: () => {
    return {
      lotes: [
        {
          num: 0,
          coffeeAverage: "",
          pendiente: ""
        }
      ]
    };
  },
  methods: {
    addLote() {
      this.lotes.push({
        num: this.lotes[this.lotes.length - 1]["num"] + 1,
        coffeeAverage: "",
        pendiente: ""
      });
    },
    removeLote(num) {
      this.lotes = this.lotes.filter(item => item.num != num);
    }
  }
};
</script>
