<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-card-title>
            <span class="title">Encuentre la asignación óptima de personal</span>
          </v-card-title>
          <v-form>
            <v-container>
              <h2>Información de lotes</h2>
              <div v-for="lote in lotes" :key="lote.id">
                <v-layout
                  :column="$vuetify.breakpoint.mdAndDown"
                  :row="!$vuetify.breakpoint.mdAndDown"
                >
                  <v-flex xs12 md4>
                    <v-text-field
                      label="Kg de café"
                      v-model="lote.kg"
                      v-validate.initi="'numeric|required'"
                      data-vv-as="Kg de café"
                      :name="'lote'+lote.id"
                      :error-messages="errors.collect('lote'+lote.id)"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-radio-group
                      label="Pendiente de inclinación"
                      v-validate="'required'"
                      :name="'pendiente'+lote.id"
                      data-vv-as="Pendiente"
                      v-model="lote.pendiente"
                      :error-messages="errors.collect('pendiente'+lote.id)"
                    >
                      <v-radio label="mayor al 200%" :value="2"></v-radio>
                      <v-radio label="101% - 200%" :value="1"></v-radio>
                      <v-radio label="20% - 100%" :value="0"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 md3 v-if="lote.id == 0">
                    <v-btn color="warning" v-on:click.native="addLote">
                      Añadir Lote
                      <v-icon dark right>add</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md3 v-else>
                    <v-btn color="error" v-on:click.native="() => deleteLote(lote.id)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </div>
              <v-divider></v-divider>
              <h2>Información de recolectores</h2>
              <div v-for="recolector in recolectores" :key="recolector.id">
                <v-layout row wrap>
                  <v-flex xs12 md3>
                    <v-text-field
                      v-validate="'numeric|required'"
                      label="Numero de recolectores"
                      :name="`recolectores${recolector.id}`"
                      :error-messages="errors.collect(`recolectores${recolector.id}`)"
                      v-model="recolector.num"
                      :disabled="!recolector.group"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field
                      label="Rendimiento"
                      v-model="recolector.rendimiento"
                      v-validate="{ required: true, regex:/^([0-9]+|[0-9]+,[0-9]{0,2}?)$/ }"
                      data-vv-as="Rendimiento"
                      :name="`rendimiento${recolector.id}`"
                      :error-messages="errors.collect(`rendimiento${recolector.id}`)"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md2>
                    <v-switch v-model="recolector.group" label="Grupo"></v-switch>
                  </v-flex>
                  <v-flex xs12 md3 v-if="recolector.id == 0">
                    <v-btn color="warning" v-on:click.native="addRecolector">
                      Añadir recolector
                      <v-icon dark right>add</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md3 v-else>
                    <v-btn color="error" v-on:click.native="() => deleteRecolector(recolector.id)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </div>
            </v-container>
            <v-flex xs12>
              <v-btn color="success" v-on:click.native="calcular">
                Calcular
              </v-btn>
            </v-flex>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "StaffAssignment",
  data() {
    return {
      recolectores: [
        {
          id: 0,
          num: 1,
          rendimiento: "",
          group: false
        }
      ],
      lotes: [
        {
          id: 0,
          kg: "",
          pendiente: ""
        }
      ]
    };
  },
  methods: {
    addRecolector() {
      this.recolectores.push({
        id: this.recolectores[this.recolectores.length - 1].id + 1,
        num: 1,
        rendimiento: "",
        group: false
      });
    },
    deleteRecolector(id) {
      this.recolectores = this.recolectores.filter(item => item.id != id);
    },
    addLote() {
      this.lotes.push({
        id: this.lotes[this.lotes.length - 1].id + 1,
        kg: "",
        pendiente: ""
      });
    },
    deleteLote(id) {
      this.lotes = this.lotes.filter(item => item.id !== id);
    },
    calcular() {
        this.$validator.validate().then(valid => {
            if (valid) {
                return 
            }
        })
    }
  }
};
</script>
