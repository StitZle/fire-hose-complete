package com.niclas.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.bson.types.ObjectId;

import java.io.IOException;


public class ObjectIdModule {

    private final static SimpleModule module = new SimpleModule( "ObjectId" );


    public static Module module() {
        return module;
    }


    static class ObjectIdSerializer extends JsonSerializer<ObjectId> {

        @Override
        public void serialize( ObjectId id, JsonGenerator jgen, SerializerProvider provider ) throws IOException {

            jgen.writeString( id.toString() );
        }
    }


    static class ObjectIdDeserializer extends JsonDeserializer<ObjectId> {

        @Override
        public ObjectId deserialize( JsonParser jp, DeserializationContext ctxt ) throws IOException {

            JsonNode node = jp.getCodec().readTree( jp );
            return new ObjectId( node.textValue() );
        }
    }


    static {
        module.addSerializer( ObjectId.class, new ObjectIdSerializer() );
        module.addDeserializer( ObjectId.class, new ObjectIdDeserializer() );
    }

}
