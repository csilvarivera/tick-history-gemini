from pydantic import Field
import json
from typing import Tuple, Any, Dict, Type
from pathlib import Path

from pydantic.fields import FieldInfo
from pydantic_settings import (
    BaseSettings,
    PydanticBaseSettingsSource,
    SettingsConfigDict,
)

local_settings_file = 'config-local-settings.json'

class JsonAppSettingsSource(PydanticBaseSettingsSource):
    """
    A simple settings source class that loads variables from a JSON file
    at the project's root.

    Here we happen to choose to use the `env_file_encoding` from Config
    when reading `config.json`
    """

    def get_field_value(
        self, field: FieldInfo, field_name: str
    ) -> Tuple[Any, str, bool]:
        encoding = self.config.get('env_file_encoding')
        file_content_json = json.loads(
            Path(self.config.get('config_file')).read_text(encoding)
        )
        field_value = file_content_json.get(field_name)
        return field_value, field_name, False

    def prepare_field_value(
        self, field_name: str, field: FieldInfo, value: Any, value_is_complex: bool
    ) -> Any:
        return value

    def __call__(self) -> Dict[str, Any]:
        d: Dict[str, Any] = {}

        for field_name, field in self.settings_cls.model_fields.items():
            field_value, field_key, value_is_complex = self.get_field_value(
                field, field_name
            )
            field_value = self.prepare_field_value(
                field_name, field, field_value, value_is_complex
            )
            if field_value is not None:
                d[field_key] = field_value

        return d

class LocalSettings(BaseSettings):
    # If you create ENV VARS with the same name in UPPER CASE, those will get replaced . 
    # But use APP_ prefix.
    # Example : APP_PROJECT_ID

    model_config = SettingsConfigDict(env_prefix="APP_", env_file_encoding='utf-8', config_file=local_settings_file)

    ORCHESTRATOR: str | None = Field(None, description="Chosen orchestrator. Either functioncalling or langchain")
    
    PROJECT_ID: str | None = Field(None, description="Project Id")
    DATASET_NAME: str | None = Field(None, description="Dataset Id")
    REGION: str | None = Field(None, description="Region")
    CONFIG_BUCKET_NAME: str | None  = Field(None, description="Name of bucket the app uses for artifacts")
    CONFIG_FILE_NAME: str | None  = Field(None, description="Filename on GCS containing the configurations")    
    
    TH_PROJECT_ID: str | None = Field (None, description="Project Id for TH")
    TH_REGION: str | None = Field (None, description="Region for TH")
    TH_DATASET_NAME: str | None = Field (None, description="Name of the BQ dataset for TH")
    TH_TABLE_NAME: str | None = Field (None, description="Name of the BQ table for TH")                                     

    MRN_PROJECT_ID: str | None = Field (None, description="Project Id for MRN")
    MRN_REGION: str | None = Field (None, description="Region for MRN")
    MRN_DATASET_NAME: str | None = Field (None, description="Name of the BQ dataset for MRN")
    MRN_TABLE_NAME: str | None = Field (None, description="Name of the BQ table for MRN")                                     



    @classmethod
    def settings_customise_sources(
        cls,
        settings_cls: Type[BaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,
    ) -> Tuple[PydanticBaseSettingsSource, ...]:
        return (
            init_settings,
            env_settings,
            JsonAppSettingsSource(settings_cls),
            file_secret_settings,
        )




    
